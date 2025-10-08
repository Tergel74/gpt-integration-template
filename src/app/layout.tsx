import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
    title: "AI Chat Assistant - GPT Integration Template",
    description:
        "A production-ready GPT integration template with Supabase authentication and modern UI",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
