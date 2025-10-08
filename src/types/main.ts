export interface Message {
    role: "user" | "assistant" | "system";
    content: string;
    id?: string;
    created_at?: string;
    mode?: Mode;
    user_id?: string;
}

export type Mode = "friend" | "mentor" | "developer";

export interface Profile {
    id: string;
    email?: string;
    full_name?: string;
    avatar_url?: string;
    created_at: string;
    updated_at: string;
}
