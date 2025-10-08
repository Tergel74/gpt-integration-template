// components/AdminPanel.tsx
"use client";
import { useState, useEffect } from "react";
import { isCurrentUserAdmin, promoteUserToAdmin } from "../lib/admin";

interface AdminPanelProps {
    className?: string;
}

export default function AdminPanel({ className = "" }: AdminPanelProps) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [promoting, setPromoting] = useState(false);
    const [result, setResult] = useState("");

    useEffect(() => {
        checkAdminStatus();
    }, []);

    const checkAdminStatus = async () => {
        try {
            const adminStatus = await isCurrentUserAdmin();
            setIsAdmin(adminStatus);
        } catch (error) {
            console.error("Error checking admin status:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePromoteUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) {
            setResult("Please enter an email address");
            return;
        }

        setPromoting(true);
        try {
            const success = await promoteUserToAdmin(email.trim());
            if (success) {
                setResult(`Successfully promoted ${email} to admin`);
                setEmail("");
            } else {
                setResult(
                    `Failed to promote ${email}. User may not exist or you may not have permission.`
                );
            }
        } catch (error) {
            setResult(`Error: ${error}`);
        } finally {
            setPromoting(false);
        }
    };

    if (loading) {
        return (
            <div className={`p-4 ${className}`}>
                <div className="animate-pulse">
                    Checking admin permissions...
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div
                className={`p-4 bg-red-50 border border-red-200 rounded-lg ${className}`}
            >
                <p className="text-red-700">
                    Access denied. Admin privileges required.
                </p>
            </div>
        );
    }

    return (
        <div className={`p-6 bg-white rounded-lg shadow-lg ${className}`}>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
                Admin Panel
            </h2>

            <div className="mb-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    ✓ Admin Access Granted
                </div>
            </div>

            <form onSubmit={handlePromoteUser} className="space-y-4">
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Promote User to Admin
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="user@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={promoting}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {promoting ? "Promoting..." : "Promote to Admin"}
                </button>
            </form>

            {result && (
                <div
                    className={`mt-4 p-3 rounded-md text-sm ${
                        result.includes("Successfully")
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                >
                    {result}
                </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Admin Notes
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Only admins can promote other users</li>
                    <li>• Debug page is only accessible to admins</li>
                    <li>• Debug page is hidden in production builds</li>
                    <li>• Use Supabase SQL to remove admin status if needed</li>
                </ul>
            </div>
        </div>
    );
}
