import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { AIProvider } from "@/contexts/AIContext";
import AICopilot from "@/components/AICopilot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "UniConnect",
    description: "University Student & Payment Management System",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    <AIProvider>
                        <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-950">
                            <div className="flex-1 w-full">
                                {children}
                            </div>
                            <AICopilot />
                        </div>
                    </AIProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
