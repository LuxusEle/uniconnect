"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // Get ID token result to check claims
            const tokenResult = await userCredential.user.getIdTokenResult();
            const role = tokenResult.claims.role;

            if (role === 'admin') {
                router.push("/admin/verifications");
            } else if (role === 'bursar') {
                router.push("/bursar/reconcile");
            } else {
                router.push("/dashboard"); // Student dashboard
            }
        } catch (err: any) {
            console.error(err);
            setError("Failed to log in. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gray-50 dark:bg-zinc-950">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-blue-500 to-cyan-400 -skew-y-6 transform origin-top-left -translate-y-24 z-0"></div>

            <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-soft-xl p-8 border-none relative z-10">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-tl from-blue-600 to-cyan-400 rounded-xl shadow-soft-md mx-auto flex items-center justify-center text-white mb-4">
                        <span className="text-2xl font-bold">U</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">UniPay Connect</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Enter your email and password to sign in</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-500 text-sm rounded-xl font-medium flex items-center gap-2">
                        <span>⚠️</span> {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase ml-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:bg-zinc-800 transition-all shadow-soft-input text-sm"
                            placeholder="user@university.lk"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase ml-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:bg-zinc-800 transition-all shadow-soft-input text-sm"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <span className="text-xs text-gray-500 font-semibold">Remember me</span>
                        </label>
                        <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-[1.02] active:scale-[0.98] text-white font-bold text-xs uppercase rounded-xl shadow-soft-md transition-all disabled:opacity-50 disabled:cursor-not-allowed tracking-wide"
                    >
                        {loading ? "SIGNING IN..." : "SIGN IN"}
                    </button>
                </form>

                {/* Helper for demo */}
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800 text-center">
                    <p className="text-xs text-gray-400 mb-2">Don't have an account?</p>
                    <a href="#" className="text-sm font-bold text-blue-500 hover:text-blue-600">Sign up</a>

                    <div className="mt-6 p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-xl text-xs text-gray-500 text-left">
                        <p className="font-bold mb-1">Demo Credentials:</p>
                        <div className="flex justify-between">
                            <span>Admin:</span> <span className="font-mono">admin@unipay.lk</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Pass:</span> <span className="font-mono">123456</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
