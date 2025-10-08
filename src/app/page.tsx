"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "../lib/supabaseClient";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const {
                data: { user },
            } = await supabaseBrowser.auth.getUser();

            if (user) {
                router.push("/chat");
            } else {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50">
            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg">
                        <span className="text-white text-3xl">🤖</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        AI Chat Assistant
                    </h1>

                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Experience intelligent conversations with our advanced
                        AI assistant. Choose from different modes to get
                        personalized responses.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <button
                            onClick={() => router.push("/login")}
                            className="px-8 py-4 bg-yellow-500 text-white rounded-xl font-medium hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Get Started
                        </button>
                        <button
                            onClick={() => router.push("/login")}
                            className="px-8 py-4 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            Sign In
                        </button>
                    </div>

                    {/* Features */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-yellow-500 flex items-center justify-center">
                                <span className="text-white text-xl">👥</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Friend Mode
                            </h3>
                            <p className="text-gray-600">
                                Casual, friendly conversations for everyday chat
                                and support.
                            </p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-yellow-500 flex items-center justify-center">
                                <span className="text-white text-xl">🎓</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Mentor Mode
                            </h3>
                            <p className="text-gray-600">
                                Professional guidance and educational support
                                for learning.
                            </p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-yellow-500 flex items-center justify-center">
                                <span className="text-white text-xl">💻</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Developer Mode
                            </h3>
                            <p className="text-gray-600">
                                Technical assistance and coding help for
                                developers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
