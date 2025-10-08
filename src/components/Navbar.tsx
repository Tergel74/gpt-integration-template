"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabaseBrowser } from "../lib/supabaseClient";
import { useChatStore } from "../store/chat";
import { Mode } from "../types/main";
import { isCurrentUserAdmin } from "../lib/admin";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { mode, setMode } = useChatStore();

    const isOnChatPage = pathname === "/chat";

    useEffect(() => {
        const getUser = async () => {
            const {
                data: { user },
            } = await supabaseBrowser.auth.getUser();
            setUser(user);

            // Check admin status if user exists
            if (user) {
                try {
                    const adminStatus = await isCurrentUserAdmin();
                    setIsAdmin(adminStatus);
                } catch (error) {
                    console.error("Error checking admin status:", error);
                    setIsAdmin(false);
                }
            }

            setLoading(false);
        };

        getUser();

        const {
            data: { subscription },
        } = supabaseBrowser.auth.onAuthStateChange(async (event, session) => {
            const newUser = session?.user ?? null;
            setUser(newUser);

            if (newUser) {
                try {
                    const adminStatus = await isCurrentUserAdmin();
                    setIsAdmin(adminStatus);
                } catch {
                    setIsAdmin(false);
                }
            } else {
                setIsAdmin(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSignOut = async () => {
        await supabaseBrowser.auth.signOut();
        router.push("/");
    };

    if (loading) {
        return null;
    }

    return (
        <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-3">
                            {/* Logo Placeholder */}
                            <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center shadow-md">
                                <span className="text-white text-lg">🤖</span>
                            </div>
                            <h1 className="text-xl font-bold text-gray-900">
                                AI Chat
                            </h1>
                        </Link>

                        {/* Mode Selector - Only show on chat page when user is logged in */}
                        {isOnChatPage && user && (
                            <div className="flex items-center gap-2 ml-6 pl-6 border-l border-gray-200">
                                <span className="text-sm text-gray-500 mr-2">
                                    Mode:
                                </span>
                                {(
                                    ["friend", "mentor", "developer"] as Mode[]
                                ).map((m) => (
                                    <button
                                        key={m}
                                        onClick={() => setMode(m)}
                                        className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                                            mode === m
                                                ? "bg-yellow-500 text-white shadow-sm"
                                                : "bg-gray-100 text-gray-600 hover:bg-yellow-50 hover:text-yellow-700"
                                        }`}
                                    >
                                        {m.charAt(0).toUpperCase() + m.slice(1)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                {/* Debug Link - Development Only */}
                                {process.env.NODE_ENV === "development" &&
                                    isAdmin && (
                                        <Link
                                            href="/debug"
                                            className="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 border border-red-200"
                                            title="⚠️ Debug tools - Remove before deployment!"
                                        >
                                            🐛 Debug
                                        </Link>
                                    )}
                                <div className="text-sm text-gray-600">
                                    {user.email}
                                </div>
                                <button
                                    onClick={handleSignOut}
                                    className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-yellow-50 rounded-lg transition-all duration-200"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => router.push("/login")}
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
