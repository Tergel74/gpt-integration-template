"use client";

import { useState } from "react";

interface ChatInputProps {
    onSend: (message: string) => void;
    loading: boolean;
    clearChat: () => void;
}

export default function ChatInput({
    onSend,
    loading,
    clearChat,
}: ChatInputProps) {
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        onSend(input);
        setInput("");
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div className="flex gap-3 items-end">
                <div className="flex-1">
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 placeholder-gray-400 shadow-sm"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-yellow-500 text-white font-medium hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
                    disabled={loading || !input.trim()}
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Sending
                        </div>
                    ) : (
                        "Send"
                    )}
                </button>
                <button
                    type="button"
                    onClick={clearChat}
                    className="px-4 py-3 rounded-xl bg-gray-500 text-white hover:bg-gray-600 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    Clear
                </button>
            </div>
        </form>
    );
}
