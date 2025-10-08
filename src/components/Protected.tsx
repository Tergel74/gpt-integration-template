// components/Protected.tsx
"use client";
import { useEffect, useState, ReactNode } from "react";
import { supabaseBrowser } from "../lib/supabaseClient";

export default function Protected({ children }: { children: ReactNode }) {
    const [authorized, setAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        async function check() {
            const {
                data: { user },
            } = await supabaseBrowser.auth.getUser();
            if (!user) {
                setAuthorized(false);
                return;
            }
            // Fetch user metadata or check DB flags (is_admin)
            const { data } = await supabaseBrowser
                .from("profiles")
                .select("is_admin")
                .eq("id", user.id)
                .single();
            setAuthorized(Boolean(data?.is_admin));
        }
        check();
    }, []);

    if (authorized === null) return <div>Checking permissions...</div>;
    if (!authorized)
        return (
            <div className="p-6">
                Access denied. Debug page is for developers only.
            </div>
        );

    return <>{children}</>;
}
