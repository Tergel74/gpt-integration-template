import OpenAI from "openai";
import { Message } from "../types/main";

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// helper to call chat completions (wraps parameters and response)
export async function callChatCompletion({
    model = "gpt-4o-mini",
    messages,
    temperature = 0.7,
}: {
    messages: Message[];
    model?: string;
    temperature?: number;
}) {
    const resp = await openai.chat.completions.create({
        model,
        messages,
        temperature,
    });
    // The SDK returns a structure; adapt to your version. We return the assistant message directly.
    const choice = resp.choices?.[0]?.message;
    return choice ?? { role: "assistant", content: "No response from model" };
}

// helper for streaming chat completions
export async function callChatCompletionStream({
    model = "gpt-4o-mini",
    messages,
    temperature = 0.7,
    onChunk,
    onComplete,
    onError,
}: {
    messages: Message[];
    model?: string;
    temperature?: number;
    onChunk: (chunk: string) => void;
    onComplete: () => void;
    onError: (error: Error) => void;
}) {
    try {
        const stream = await openai.chat.completions.create({
            model,
            messages,
            temperature,
            stream: true,
        });

        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
                onChunk(content);
            }
        }

        onComplete();
    } catch (error) {
        onError(error as Error);
    }
}
