// app/debug/page.tsx
"use client";
import { notFound } from "next/navigation";
import Protected from "../../components/Protected";
import AdminPanel from "../../components/AdminPanel";
import { useState } from "react";
import apiClient from "../../lib/axios";
import { supabaseBrowser } from "../../lib/supabaseClient";

export default function DebugPage() {
    // Hide debug page in production
    if (process.env.NODE_ENV === "production") {
        notFound();
    }

    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const testModel = async () => {
        setLoading(true);
        try {
            const res = await apiClient.post("/api/chat", {
                messages: [{ role: "user", content: prompt }],
                mode: "developer",
                userId: (await supabaseBrowser.auth.getUser())?.data?.user?.id,
            });
            const data = res.data;
            setResult(JSON.stringify(data?.reply, null, 2));
        } catch (err: unknown) {
            // Enhanced error handling for axios errors
            const errorInfo = {
                message: err instanceof Error ? err.message : "Unknown error",
                status:
                    err && typeof err === "object" && "response" in err
                        ? (err as { response?: { status: number } }).response
                              ?.status
                        : undefined,
                data:
                    err && typeof err === "object" && "response" in err
                        ? (err as { response?: { data: unknown } }).response
                              ?.data
                        : undefined,
                url:
                    err && typeof err === "object" && "config" in err
                        ? (err as { config?: { url: string } }).config?.url
                        : undefined,
            };

            if (err && typeof err === "object" && "response" in err) {
                const axiosError = err as {
                    response?: { status: number; data: unknown };
                };
                setResult(
                    `API Error (${
                        axiosError.response?.status
                    }): ${JSON.stringify(axiosError.response?.data, null, 2)}`
                );
            } else if (err && typeof err === "object" && "request" in err) {
                setResult(`Network Error: ${errorInfo.message}`);
            } else {
                setResult(`Error: ${JSON.stringify(errorInfo, null, 2)}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Protected>
            <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50 p-6 mt-[4rem]">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6">
                        <h1 className="text-2xl font-bold mb-6 text-gray-900">
                            Debug Console (Developer Only)
                        </h1>

                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Prompt
                            </label>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                                rows={4}
                                placeholder="Enter your test prompt here..."
                            />
                        </div>

                        <button
                            onClick={testModel}
                            disabled={loading}
                            className="px-6 py-3 bg-yellow-500 text-white rounded-xl font-medium hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg mb-6"
                        >
                            {loading ? "Running..." : "Run Prompt"}
                        </button>

                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-3 text-gray-900">
                                Result
                            </h2>
                            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl max-h-96 overflow-auto text-sm">
                                {result || "Run a test to see output."}
                            </pre>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <h3 className="font-semibold mb-3 text-gray-900">
                                Developer Tools
                            </h3>
                            <button
                                onClick={async () => {
                                    // example: clear user's message table (dangerous)
                                    const {
                                        data: { user },
                                    } = await supabaseBrowser.auth.getUser();
                                    if (!user) return alert("Login first");
                                    if (
                                        !confirm(
                                            "Delete messages for current user?"
                                        )
                                    )
                                        return;
                                    const { error } = await supabaseBrowser
                                        .from("messages")
                                        .delete()
                                        .eq("user_id", user.id);
                                    if (error) alert("Error: " + error.message);
                                    else alert("Deleted");
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all duration-200 shadow-md"
                            >
                                Wipe my messages (dev only)
                            </button>
                        </div>
                    </div>

                    {/* Admin Panel */}
                    <div className="mt-8">
                        <AdminPanel />
                    </div>
                </div>
            </div>
        </Protected>
    );
}
