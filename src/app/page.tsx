"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push("/login");
    }, [router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-zinc-950">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
    );
}
