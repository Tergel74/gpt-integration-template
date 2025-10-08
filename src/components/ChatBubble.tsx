interface ChatBubbleProps {
    role: "user" | "assistant" | "system";
    content: string;
}

export default function ChatBubble({ role, content }: ChatBubbleProps) {
    const isUser = role === "user";

    return (
        <div
            className={`flex ${isUser ? "justify-end" : "justify-start"} group`}
        >
            <div
                className={`flex items-start gap-3 max-w-[80%] ${
                    isUser ? "flex-row-reverse" : "flex-row"
                }`}
            >
                {/* Avatar */}
                <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${
                        isUser
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-300 text-gray-700"
                    }`}
                >
                    {isUser ? "U" : "AI"}
                </div>

                {/* Message bubble */}
                <div
                    className={`px-4 py-3 rounded-2xl text-sm shadow-md whitespace-pre-wrap transition-all duration-200 group-hover:shadow-lg ${
                        isUser
                            ? "bg-yellow-500 text-white rounded-br-md"
                            : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
                    }`}
                >
                    {content}
                </div>
            </div>
        </div>
    );
}
