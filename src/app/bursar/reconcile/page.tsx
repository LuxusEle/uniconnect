"use client";
import React, { useState } from "react";
import { Check, X, Search, Filter } from "lucide-react";

// Mock Data
const PENDING_PAYMENTS = [
    { id: "p1", student: "K. Perera", refNo: "REF-2023-001", amount: 5000, date: "2023-10-25", slipPreview: "/slip-mock.jpg" },
    { id: "p2", student: "S. Silva", refNo: "REF-2023-004", amount: 2500, date: "2023-10-26", slipPreview: "/slip-mock.jpg" },
    { id: "p3", student: "M. Fernando", refNo: "REF-2023-009", amount: 5000, date: "2023-10-26", slipPreview: "/slip-mock.jpg" },
];

export default function ToReconcilePage() {
    const [payments, setPayments] = useState(PENDING_PAYMENTS);
    const [searchTerm, setSearchTerm] = useState("");

    const handleAction = (id: string, action: 'approve' | 'reject') => {
        // In real app, update Firestore status
        alert(`${action.toUpperCase()} Payment ${id}`);
        setPayments(prev => prev.filter(p => p.id !== id));
    };

    const filtered = payments.filter(p =>
        p.refNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.student.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Payment Reconciliation</h1>
                <p className="text-gray-500">Verify bank slips against reference numbers.</p>
            </header>

            {/* Filters */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by Ref No or Student Name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800">
                    <Filter size={18} />
                    Filter
                </button>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-soft-xl overflow-hidden border-none">
                <div className="p-6 pb-0 mb-0 bg-white dark:bg-zinc-800 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                    <h6 className="font-bold dark:text-white">Recent Transactions</h6>
                </div>
                <div className="flex-auto px-0 pt-0 pb-2">
                    <div className="p-0 overflow-x-auto">
                        <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                            <thead className="align-bottom">
                                <tr>
                                    <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Ref No</th>
                                    <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Student</th>
                                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Date</th>
                                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Amount</th>
                                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Slip</th>
                                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((payment) => (
                                    <tr key={payment.id} className="border-b border-gray-100 dark:border-zinc-700/50 hover:bg-gray-50 dark:hover:bg-zinc-700/30 transition-colors">
                                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                            <div className="flex px-4 py-1">
                                                <div className="flex flex-col justify-center">
                                                    <h6 className="mb-0 text-sm leading-normal dark:text-white font-semibold">{payment.refNo}</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                            <div className="px-4">
                                                <h6 className="mb-0 text-sm leading-normal dark:text-white">{payment.student}</h6>
                                            </div>
                                        </td>
                                        <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                            <span className="text-xs font-semibold leading-tight text-slate-400 dark:text-slate-500">{payment.date}</span>
                                        </td>
                                        <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                            <span className="text-sm font-bold leading-tight text-slate-500 dark:text-zinc-400">LKR {payment.amount.toLocaleString()}</span>
                                        </td>
                                        <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                            <button className="text-xs font-semibold leading-tight text-slate-400 hover:text-blue-500"> View </button>
                                        </td>
                                        <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleAction(payment.id, 'reject')}
                                                    className="text-xs font-bold text-red-500 hover:text-red-700 uppercase"
                                                >
                                                    Reject
                                                </button>
                                                <button
                                                    onClick={() => handleAction(payment.id, 'approve')}
                                                    className="text-xs font-bold text-emerald-500 hover:text-emerald-700 uppercase"
                                                >
                                                    Approve
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500 text-sm">
                                            No pending payments found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
