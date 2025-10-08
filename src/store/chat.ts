import { create } from "zustand";
import { Message, Mode } from "../types/main";

type State = {
    messages: Message[];
    mode: Mode;
    loading: boolean;
    addMessage: (m: Message) => void;
    setMode: (m: Mode) => void;
    clearMessages: () => void;
    setLoading: (b: boolean) => void;
    setMessages: (messages: Message[]) => void;
};

export const useChatStore = create<State>((set) => ({
    messages: [],
    mode: "friend",
    loading: false,
    addMessage: (message) =>
        set((state) => ({
            messages: [
                ...state.messages,
                {
                    ...message,
                    id: message.id || `${Date.now()}-${Math.random()}`,
                },
            ],
        })),
    setMode: (mode) => set({ mode }),
    clearMessages: () => set({ messages: [] }),
    setLoading: (loading) => set({ loading }),
    setMessages: (messages) => set({ messages }),
}));
