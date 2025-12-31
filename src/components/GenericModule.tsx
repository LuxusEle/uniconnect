"use client";
import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, getDocs, addDoc, query, where, Timestamp } from "firebase/firestore";
import MaterialCard from "@/components/MaterialCard";
import { Plus, Search, Loader2 } from "lucide-react";

export interface FieldConfig {
    key: string;
    label: string;
    type: 'text' | 'number' | 'date' | 'select' | 'status';
    options?: string[]; // For select type
    required?: boolean;
}

export interface GenericModuleProps {
    title: string;
    collectionPath: string;
    fields: FieldConfig[];
    role: string; // 'admin', 'staff', 'student'
    filterByUser?: boolean; // If true, only show docs where userId == auth.currentUser.uid
}

export default function GenericModule({ title, collectionPath, fields, role, filterByUser }: GenericModuleProps) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchData();
    }, [collectionPath, filterByUser]);

    const fetchData = async () => {
        try {
            setLoading(true);
            let q = query(collection(db, collectionPath));

            // Should add user filter here if needed, keeping it simple for now
            // if (filterByUser && auth.currentUser) {
            //      q = query(collection(db, collectionPath), where("userId", "==", auth.currentUser.uid));
            // }

            const querySnapshot = await getDocs(q);
            const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setData(items);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await addDoc(collection(db, collectionPath), {
                ...formData,
                createdAt: Timestamp.now(),
                status: 'Active', // Default status
                createdBy: auth.currentUser?.email || 'unknown'
            });
            setShowModal(false);
            setFormData({});
            fetchData(); // Refresh
        } catch (error) {
            console.error("Error adding document:", error);
            alert("Failed to save. check console.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleInputChange = (key: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-tr from-blue-600 to-cyan-400 text-white rounded-xl shadow-soft-md hover:shadow-soft-xl transition-all hover:-translate-y-0.5"
                >
                    <Plus size={18} />
                    <span>New Entry</span>
                </button>
            </div>

            <MaterialCard className="overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-zinc-800 flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search records..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-zinc-800/50 text-gray-500 font-medium uppercase text-xs">
                            <tr>
                                {fields.map(f => (
                                    <th key={f.key} className="px-6 py-4">{f.label}</th>
                                ))}
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={fields.length + 2} className="px-6 py-8 text-center text-gray-400">
                                        <div className="flex justify-center items-center gap-2">
                                            <Loader2 className="animate-spin" size={20} />
                                            Loading data...
                                        </div>
                                    </td>
                                </tr>
                            ) : data.length === 0 ? (
                                <tr>
                                    <td colSpan={fields.length + 2} className="px-6 py-8 text-center text-gray-400">
                                        No records found. Click "New Entry" to create one.
                                    </td>
                                </tr>
                            ) : (
                                data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/50 transition-colors">
                                        {fields.map(f => (
                                            <td key={f.key} className="px-6 py-4 text-gray-700 dark:text-gray-300">
                                                {item[f.key]}
                                            </td>
                                        ))}
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                                {item.status || 'Active'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </MaterialCard>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Add New {title}</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {fields.map(f => (
                                <div key={f.key}>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{f.label}</label>
                                    {f.type === 'select' ? (
                                        <select
                                            required={f.required}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                                            onChange={(e) => handleInputChange(f.key, e.target.value)}
                                        >
                                            <option value="">Select an option</option>
                                            {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                                        </select>
                                    ) : (
                                        <input
                                            type={f.type}
                                            required={f.required}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                                            onChange={(e) => handleInputChange(f.key, e.target.value)}
                                        />
                                    )}
                                </div>
                            ))}

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-600 dark:text-gray-400 font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                                >
                                    {submitting ? 'Saving...' : 'Save Record'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
