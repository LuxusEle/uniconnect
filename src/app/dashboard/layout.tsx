"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import ModernSidebar from "@/components/ModernSidebar";

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();

    // Route protection
    if (!loading && !user) {
        router.push("/login");
    }

    return (
        <div className="min-h-screen bg-[#e0e5ec] dark:bg-[#212121] font-sans relative overflow-hidden">

            {/* Background Decorative Elements */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-10 animate-blob bg-purple-300 dark:bg-purple-900"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-10 animate-blob animation-delay-2000 bg-yellow-300 dark:bg-yellow-900"></div>
                <div className="absolute top-[40%] left-[20%] w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-10 animate-blob animation-delay-4000 bg-pink-300 dark:bg-pink-900"></div>
            </div>

            {/* Sidebar Component with its own Toggle & Navigation */}
            <ModernSidebar />

            {/* Main Content Area */}
            <main className="relative z-10 flex-1 min-h-screen transition-all duration-300 ml-72 p-8">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
