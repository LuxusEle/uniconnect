"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, query, getDocs, orderBy } from 'firebase/firestore';
import { FinanceTransaction } from '@/lib/firebase/schema';
import { CreditCard, ArrowUpRight, ArrowDownLeft, Wallet as WalletIcon, Calendar } from 'lucide-react';

export default function StudentWalletPage() {
    const { user } = useAuth();
    const [balance, setBalance] = useState<number>(0);
    const [currency, setCurrency] = useState<string>('LKR');
    const [transactions, setTransactions] = useState<FinanceTransaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWalletData = async () => {
            if (!user) return;

            try {
                // Fetch Balance
                const walletDoc = await getDoc(doc(db, "users", user.uid, "financial", "wallet"));
                if (walletDoc.exists()) {
                    setBalance(walletDoc.data().balance || 0);
                    setCurrency(walletDoc.data().currency || 'LKR');
                }

                // Fetch Transactions
                const txnsQuery = query(
                    collection(db, "users", user.uid, "financial", "wallet", "transactions"),
                    orderBy('date', 'desc')
                );
                const querySnapshot = await getDocs(txnsQuery);
                const txns: FinanceTransaction[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    txns.push({
                        id: doc.id,
                        ...data,
                        date: data.date.toDate() // Convert Firestore Timestamp to Date
                    } as FinanceTransaction);
                });
                setTransactions(txns);

            } catch (error) {
                console.error("Error fetching wallet data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWalletData();
    }, [user]);

    if (loading) {
        return <div className="p-8 text-center text-gray-500 animate-pulse">Loading wallet details...</div>;
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">My Wallet</h1>
                    <p className="text-sm text-gray-500">Manage your payments and scholarships</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <CreditCard size={16} />
                        Top Up
                    </button>
                </div>
            </div>

            {/* Balance Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <WalletIcon size={120} />
                    </div>
                    <div className="relative z-10">
                        <p className="text-gray-400 text-sm font-medium mb-1">Total Balance</p>
                        <h2 className="text-4xl font-bold mb-4">{currency} {balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-white/10 rounded text-xs">Student ID: {user?.uid.substring(0, 8).toUpperCase()}</span>
                            <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs border border-green-500/30">Active</span>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                            <ArrowDownLeft size={20} />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Income (This Sem)</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800 pl-13">
                        {currency} {transactions.filter(t => t.type === 'credit').reduce((acc, t) => acc + t.amount, 0).toLocaleString()}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                            <ArrowUpRight size={20} />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Expenses (This Sem)</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800 pl-13">
                        {currency} {Math.abs(transactions.filter(t => t.type === 'debit' || t.type === 'fee').reduce((acc, t) => acc + t.amount, 0)).toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Transactions List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800">Recent Transactions</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50/50 text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-4">Transaction Details</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4 text-right">Amount</th>
                                <th className="px-6 py-4 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {transactions.length > 0 ? (
                                transactions.map((txn) => (
                                    <tr key={txn.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${txn.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                    {txn.type === 'credit' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">{txn.description}</p>
                                                    <p className="text-xs text-gray-400">ID: {txn.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} />
                                                {txn.date.toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="capitalize px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs font-medium">
                                                {txn.category?.replace('_', ' ') || 'General'}
                                            </span>
                                        </td>
                                        <td className={`px-6 py-4 text-right font-bold ${txn.type === 'credit' ? 'text-green-600' : 'text-slate-800'}`}>
                                            {txn.type === 'credit' ? '+' : '-'}{currency} {Math.abs(txn.amount).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${txn.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                    txn.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                        'bg-red-100 text-red-700'
                                                }`}>
                                                {txn.status.toUpperCase()}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                                        No transactions found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
