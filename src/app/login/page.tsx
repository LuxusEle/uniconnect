"use client";
import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
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
            const user = userCredential.user;

            // 1. Try Custom Claims
            const tokenResult = await user.getIdTokenResult();
            let role = tokenResult.claims.role;

            // 2. Fallback to Firestore if claim is missing
            if (!role) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    role = userDoc.data().role;
                    console.log("Fetched role from Firestore:", role);
                }
            }

            // 3. Routing based on role
            switch (role) {
                case 'admin':
                    router.push("/admin");
                    break;
                case 'bursar':
                    router.push("/bursar");
                    break;
                case 'staff':
                    router.push("/staff");
                    break;
                case 'dean':
                    router.push("/admin"); // Redirect Dean to admin for now, or specific dashboard if created
                    break;
                default:
                    router.push("/dashboard"); // Default to Student Dashboard
                    break;
            }

        } catch (err: any) {
            console.error(err);
            setError("Failed to log in. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    const createDemoAccounts = async () => {
        setLoading(true);
        setError("");
        const demoUsers = [
            { email: "admin@unipay.lk", pass: "123456", role: "admin" },
            { email: "staff@unipay.lk", pass: "123456", role: "staff" },
            { email: "student@unipay.lk", pass: "123456", role: "student" },
            { email: "bursar@unipay.lk", pass: "123456", role: "bursar" },
        ];

        let createdCount = 0;

        try {
            for (const u of demoUsers) {
                try {
                    // Create Auth User
                    let uid;
                    try {
                        const cred = await createUserWithEmailAndPassword(auth, u.email, u.pass);
                        uid = cred.user.uid;
                    } catch (authError: any) {
                        if (authError.code === 'auth/email-already-in-use') {
                            // If user exists, try to get UID via login (hacky but works for demo setup)
                            const login = await signInWithEmailAndPassword(auth, u.email, u.pass);
                            uid = login.user.uid;
                        } else {
                            throw authError; // rethrow other errors
                        }
                    }

                    if (uid) {
                        // Set Role & Profile
                        await setDoc(doc(db, "users", uid), {
                            email: u.email,
                            role: u.role,
                            createdAt: new Date(),
                            displayName: `Demo ${u.role.charAt(0).toUpperCase() + u.role.slice(1)}`
                        }, { merge: true });

                        // Seed Role-Specific Data
                        if (u.role === 'student') {
                            // Seed Transactions
                            await setDoc(doc(db, "users", uid, "financial", "wallet"), {
                                balance: 12500.00,
                                currency: 'LKR',
                                updatedAt: new Date()
                            });
                            const transactions = [
                                { id: 'TXN001', date: new Date(2025, 0, 15), amount: 5000, type: 'credit', description: 'Mahapola Scholarship', status: 'completed' },
                                { id: 'TXN002', date: new Date(2025, 0, 10), amount: -2500, type: 'debit', description: 'Semester Exam Fee', status: 'completed' },
                                { id: 'TXN003', date: new Date(2024, 11, 28), amount: 15000, type: 'credit', description: 'Bursary Payment', status: 'completed' }
                            ];
                            for (const t of transactions) {
                                await setDoc(doc(db, "users", uid, "financial", "wallet", "transactions", t.id), t);
                            }

                            // Seed Results
                            const results = [
                                { courseCode: 'CS101', title: 'Intro to CS', grade: 'A', gpa: 4.0, semester: 'Sem 1' },
                                { courseCode: 'CS102', title: 'Algorithms', grade: 'B+', gpa: 3.3, semester: 'Sem 1' },
                                { courseCode: 'MA101', title: 'Calculus', grade: 'A-', gpa: 3.7, semester: 'Sem 1' }
                            ];
                            for (const r of results) {
                                await setDoc(doc(db, "users", uid, "academics", "results", "history", r.courseCode), r);
                            }
                        }

                        if (u.role === 'staff') {
                            // Seed Modules
                            await setDoc(doc(db, "users", uid, "academic", "schedule"), {
                                nextClass: "CS102 - Room 405 (10:00 AM)"
                            });
                        }

                        createdCount++;
                    }

                } catch (e: any) {
                    console.error("Failed to seed " + u.email, e);
                }
            }

            setError(`Seeding complete. ${createdCount} accounts processed.`);
            // Don't sign out automatically so they can see the message, or sign out if preferred.
            await signOut(auth);

        } catch (err: any) {
            setError("Setup failed: " + err.message);
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
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800">
                    <p className="text-xs text-center text-gray-400 mb-4">Quick Login (Testing)</p>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                setEmail("admin@unipay.lk");
                                setPassword("123456");
                            }}
                            className="p-2 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400 rounded-lg text-xs font-bold transition-colors"
                        >
                            Admin
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setEmail("staff@unipay.lk");
                                setPassword("123456");
                            }}
                            className="p-2 bg-amber-50 hover:bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:hover:bg-amber-900/30 dark:text-amber-400 rounded-lg text-xs font-bold transition-colors"
                        >
                            Staff
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setEmail("student@unipay.lk");
                                setPassword("123456");
                            }}
                            className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:text-blue-400 rounded-lg text-xs font-bold transition-colors"
                        >
                            Student
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setEmail("bursar@unipay.lk");
                                setPassword("123456");
                            }}
                            className="p-2 bg-green-50 hover:bg-green-100 text-green-600 dark:bg-green-900/20 dark:hover:bg-green-900/30 dark:text-green-400 rounded-lg text-xs font-bold transition-colors"
                        >
                            Bursar
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={createDemoAccounts}
                        className="mt-4 w-full text-[10px] text-gray-400 hover:text-gray-600 underline text-center block"
                    >
                        Initialize Demo Accounts
                    </button>
                </div>
            </div>
        </div>
    );
}
