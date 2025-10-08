// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
    callChatCompletion,
    callChatCompletionStream,
} from "../../../lib/openai";
import { supabaseServer } from "../../../lib/supabaseServer";
import { rateLimit } from "../../../lib/rate-limit";
import { v4 as uuidv4 } from "uuid";

const systemPrompts: Record<string, string> = {
    friend: "You are Jake, a reliable friend who loves to make people smile. You're casual, supportive, and always ready to listen. Keep responses conversational and warm.",
    mentor: "You are a supportive life mentor who explains concepts clearly and teaches the user with easy-to-understand examples. Focus on growth, learning, and providing actionable guidance.",
    developer:
        "You are a senior developer who responds concisely and with technical accuracy. Provide practical coding solutions, best practices, and technical insights. Use code examples when helpful.",
};

// Helper function to get user IP for rate limiting
function getUserIdentifier(request: NextRequest): string {
    const forwarded = request.headers.get("x-forwarded-for");
    const real = request.headers.get("x-real-ip");
    const ip = forwarded?.split(",")[0] || real || "unknown";
    return ip;
}

// Helper function to validate messages
function validateMessages(
    messages: Array<{ role: string; content: string }>
): boolean {
    if (!Array.isArray(messages) || messages.length === 0) {
        return false;
    }

    return messages.every(
        (msg) =>
            msg &&
            typeof msg === "object" &&
            typeof msg.content === "string" &&
            msg.content.trim().length > 0 &&
            ["user", "assistant", "system"].includes(msg.role)
    );
}

export async function POST(req: NextRequest) {
    try {
        // Rate limiting
        const userIdentifier = getUserIdentifier(req);
        const rateLimitResult = rateLimit(userIdentifier);

        if (!rateLimitResult.success) {
            return NextResponse.json(
                {
                    error: "Rate limit exceeded. Please try again later.",
                    details: {
                        limit: rateLimitResult.limit,
                        remaining: rateLimitResult.remaining,
                        reset: new Date(rateLimitResult.reset).toISOString(),
                    },
                },
                {
                    status: 429,
                    headers: {
                        "X-RateLimit-Limit": rateLimitResult.limit.toString(),
                        "X-RateLimit-Remaining":
                            rateLimitResult.remaining.toString(),
                        "X-RateLimit-Reset": rateLimitResult.reset.toString(),
                    },
                }
            );
        }

        const body = await req.json();
        const { messages, mode = "friend", userId, stream = false } = body;

        // Validate input
        if (!validateMessages(messages)) {
            return NextResponse.json(
                {
                    error: "Invalid messages format. Messages must be non-empty strings with valid roles.",
                },
                { status: 400 }
            );
        }

        if (!Object.keys(systemPrompts).includes(mode)) {
            return NextResponse.json(
                {
                    error: `Invalid mode. Must be one of: ${Object.keys(
                        systemPrompts
                    ).join(", ")}`,
                },
                { status: 400 }
            );
        }

        // Check content length
        const totalLength = messages.reduce(
            (sum: number, msg: { content: string }) => sum + msg.content.length,
            0
        );
        if (totalLength > 10000) {
            // 10KB limit
            return NextResponse.json(
                {
                    error: "Message content too long. Please keep messages under 10KB.",
                },
                { status: 400 }
            );
        }

        const systemMessage = {
            role: "system" as const,
            content: systemPrompts[mode],
        };
        const allMessages = [systemMessage, ...messages];

        // Handle streaming response
        if (stream) {
            return await handleStreamingResponse(allMessages, userId, mode);
        }

        // Regular response
        const assistant = await callChatCompletion({ messages: allMessages });

        const assistantMessage = {
            role: "assistant" as const,
            content: assistant.content ?? "No response from the AI model.",
            id: uuidv4(),
        };

        // Persist to database if user is authenticated
        if (userId) {
            try {
                // Save user message first with current timestamp
                const userTimestamp = new Date().toISOString();
                await supabaseServer.from("messages").insert([
                    {
                        user_id: userId,
                        role: "user",
                        content: messages[messages.length - 1].content,
                        mode: mode,
                        created_at: userTimestamp,
                    },
                ]);

                // Save assistant message after a small delay to ensure proper ordering
                const assistantTimestamp = new Date(
                    Date.now() + 1000
                ).toISOString();
                await supabaseServer.from("messages").insert([
                    {
                        id: assistantMessage.id,
                        user_id: userId,
                        role: assistantMessage.role,
                        content: assistantMessage.content,
                        mode: mode,
                        created_at: assistantTimestamp,
                    },
                ]);
            } catch (dbError) {
                console.error("Database error:", dbError);
                // Don't fail the request if DB save fails
            }
        }

        return NextResponse.json({
            reply: assistantMessage,
            rateLimit: {
                remaining: rateLimitResult.remaining,
                reset: rateLimitResult.reset,
            },
        });
    } catch (error) {
        console.error("Chat API error:", error);

        if (error instanceof Error) {
            // OpenAI API errors
            if (error.message.includes("API key")) {
                return NextResponse.json(
                    { error: "OpenAI API configuration error." },
                    { status: 500 }
                );
            }

            if (error.message.includes("quota")) {
                return NextResponse.json(
                    { error: "OpenAI API quota exceeded." },
                    { status: 503 }
                );
            }
        }

        return NextResponse.json(
            { error: "An unexpected error occurred. Please try again." },
            { status: 500 }
        );
    }
}

async function handleStreamingResponse(
    messages: Array<{ role: "system" | "user" | "assistant"; content: string }>,
    userId: string | undefined,
    mode: string
) {
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        async start(controller) {
            try {
                const assistantMessageId = uuidv4();
                let fullContent = "";

                await callChatCompletionStream({
                    messages,
                    onChunk: (chunk: string) => {
                        fullContent += chunk;
                        const data = JSON.stringify({
                            chunk,
                            id: assistantMessageId,
                        });
                        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
                    },
                    onComplete: async () => {
                        // Save to database
                        if (userId && fullContent) {
                            try {
                                await supabaseServer.from("messages").insert([
                                    {
                                        id: assistantMessageId,
                                        user_id: userId,
                                        role: "assistant",
                                        content: fullContent,
                                        mode: mode,
                                    },
                                ]);
                            } catch (dbError) {
                                console.error(
                                    "Failed to save streaming message:",
                                    dbError
                                );
                            }
                        }

                        controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
                        controller.close();
                    },
                    onError: (error: Error) => {
                        console.error("Streaming error:", error);
                        const errorData = JSON.stringify({
                            error: "Streaming failed",
                        });
                        controller.enqueue(
                            encoder.encode(`data: ${errorData}\n\n`)
                        );
                        controller.close();
                    },
                });
            } catch (error) {
                console.error("Stream setup error:", error);
                const errorData = JSON.stringify({
                    error: "Failed to start stream",
                });
                controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
                controller.close();
            }
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
        },
    });
}
