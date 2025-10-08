export default function ChatLoader() {
    return (
        <div className="flex justify-start">
            <div className="flex items-start gap-3">
                {/* AI Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 flex items-center justify-center text-sm font-medium shrink-0">
                    AI
                </div>

                {/* Typing indicator */}
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-1">
                        <span className="text-gray-500 text-sm mr-2">
                            AI is typing
                        </span>
                        <div className="flex gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
