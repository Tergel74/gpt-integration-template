"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const {
                data: { user },
            } = await supabaseBrowser.auth.getUser();
            if (user) {
                router.push("/chat");
            }
        };
        checkUser();
    }, [router]);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            if (isSignUp) {
                const { error } = await supabaseBrowser.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                setMessage("Check your email for verification link!");
            } else {
                const { error } = await supabaseBrowser.auth.signInWithPassword(
                    {
                        email,
                        password,
                    }
                );
                if (error) throw error;
                router.push("/chat");
            }
        } catch (error: unknown) {
            setMessage(
                error instanceof Error ? error.message : "An error occurred"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8">
                    <div className="text-center mb-8">
                        {/* Logo Placeholder */}
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r bg-yellow-500 flex items-center justify-center">
                            <span className="text-white text-2xl">🤖</span>
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">
                            {isSignUp ? "Create Account" : "Welcome Back"}
                        </h1>
                        <p className="text-gray-600 mt-2">
                            {isSignUp
                                ? "Join our AI chat community"
                                : "Sign in to continue chatting"}
                        </p>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-4">
                        <div>
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200"
                            />
                        </div>

                        {message && (
                            <div
                                className={`text-sm p-3 rounded-xl ${
                                    message.includes("Check your email")
                                        ? "bg-green-50 text-green-700 border border-green-200"
                                        : "bg-red-50 text-red-700 border border-red-200"
                                }`}
                            >
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-yellow-500 text-white rounded-2xl font-medium hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                            ) : isSignUp ? (
                                "Create Account"
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <div className="my-6 flex items-center">
                        <div className="flex-1 border-t border-gray-200"></div>
                        <span className="px-4 text-gray-500 text-sm">or</span>
                        <div className="flex-1 border-t border-gray-200"></div>
                    </div>

                    <div className="text-center mt-6">
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-yellow-600 hover:text-yellow-700 font-medium transition-colors duration-200"
                        >
                            {isSignUp
                                ? "Already have an account? Sign in"
                                : "Don't have an account? Sign up"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
