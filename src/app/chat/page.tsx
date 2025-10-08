"use client";

import { useEffect, useCallback } from "react";
import apiClient from "../../lib/axios";
import { useChatStore } from "../../store/chat";
import ChatBubble from "../../components/ChatBubble";
import { supabaseBrowser } from "../../lib/supabaseClient";
import { Message } from "../../types/main";
import ChatInput from "@/components/ChatInput";
import ChatLoader from "@/components/ChatLoader";

export default function ChatPage() {
    const {
        messages,
        mode,
        loading,
        addMessage,
        setLoading,
        clearMessages,
        setMessages,
    } = useChatStore();

    const loadChatHistory = useCallback(async () => {
        try {
            const {
                data: { user },
            } = await supabaseBrowser.auth.getUser();
            if (user) {
                const { data } = await supabaseBrowser
                    .from("messages")
                    .select("*")
                    .eq("user_id", user.id)
                    .order("created_at", { ascending: true });

                if (data && data.length > 0) {
                    const loadedMessages = data.map((msg) => ({
                        role: msg.role as "user" | "assistant",
                        content: msg.content,
                        id: msg.id,
                    }));
                    setMessages(loadedMessages);
                }
            }
        } catch (error) {
            console.error("Failed to load chat history:", error);
        }
    }, [setMessages]);

    // Load chat history on mount
    useEffect(() => {
        loadChatHistory();
    }, [loadChatHistory]);

    const sendMessage = async (text: string) => {
        try {
            const {
                data: { user },
            } = await supabaseBrowser.auth.getUser();
            const userId = user?.id;

            // Add user message immediately
            const userMessage: Message = {
                role: "user",
                content: text,
                id: `user-${Date.now()}`,
            };
            addMessage(userMessage);
            setLoading(true);

            // Send to API
            const response = await apiClient.post("/api/chat", {
                messages: [{ role: "user", content: text }],
                mode,
                userId,
            });

            const data = response.data;
            if (data?.reply) {
                addMessage({
                    role: "assistant",
                    content: data.reply.content,
                    id: `assistant-${Date.now()}`,
                });
            } else {
                addMessage({
                    role: "assistant",
                    content: "Sorry, I couldn't generate a response.",
                    id: `error-${Date.now()}`,
                });
            }
        } catch (error: unknown) {
            console.error("Error sending message:", error);

            // Enhanced error handling for axios errors
            let errorMessage =
                "Sorry, there was an error processing your message.";

            if (error && typeof error === "object" && "response" in error) {
                const axiosError = error as {
                    response?: { status: number };
                    request?: unknown;
                };
                // Server responded with error status
                switch (axiosError.response?.status) {
                    case 429:
                        errorMessage =
                            "Too many requests. Please wait a moment and try again.";
                        break;
                    case 500:
                        errorMessage = "Server error. Please try again later.";
                        break;
                    case 503:
                        errorMessage =
                            "Service temporarily unavailable. Please try again later.";
                        break;
                    default:
                        errorMessage = `Request failed (${axiosError.response?.status}). Please try again.`;
                }
            } else if (
                error &&
                typeof error === "object" &&
                "request" in error
            ) {
                errorMessage =
                    "Network error. Please check your connection and try again.";
            }

            addMessage({
                role: "assistant",
                content: errorMessage,
                id: `error-${Date.now()}`,
            });
        } finally {
            setLoading(false);
        }
    };

    const clearAllMessages = async () => {
        try {
            const {
                data: { user },
            } = await supabaseBrowser.auth.getUser();
            if (user) {
                await supabaseBrowser
                    .from("messages")
                    .delete()
                    .eq("user_id", user.id);
            }
            clearMessages();
        } catch (error) {
            console.error("Error clearing messages:", error);
        }
    };

    return (
        <div className="flex flex-col h-[100vh] bg-gradient-to-br from-yellow-50 to-amber-50">
            {/* Chat area */}
            <div className="flex-1 overflow-y-auto px-4 py-6 mt-[4rem]">
                <div className="max-w-4xl mx-auto space-y-4">
                    {messages.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg">
                                <span className="text-white text-2xl">💬</span>
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 mb-2">
                                Start a conversation
                            </h3>
                            <p className="text-gray-600">
                                Choose a mode above and send your first message!
                            </p>
                        </div>
                    )}
                    {messages
                        .filter((msg) => msg.role !== "system")
                        .map((msg, i) => (
                            <div
                                key={msg.id ?? i}
                                className="animate-in slide-in-from-bottom-4 duration-300"
                            >
                                <ChatBubble
                                    role={msg.role}
                                    content={msg.content}
                                />
                            </div>
                        ))}
                    {loading && (
                        <div className="animate-in slide-in-from-bottom-4 duration-300">
                            <ChatLoader />
                        </div>
                    )}
                </div>
            </div>

            {/* Input area */}
            <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200">
                <div className="max-w-4xl mx-auto">
                    <ChatInput
                        onSend={sendMessage}
                        loading={loading}
                        clearChat={clearAllMessages}
                    />
                </div>
            </div>
        </div>
    );
}
