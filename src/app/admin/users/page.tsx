"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc, orderBy, query } from 'firebase/firestore';
import { UserProfile, UserRole } from '@/lib/firebase/schema';
import { Trash2, Edit, User, Shield, Check } from 'lucide-react';

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [tempRole, setTempRole] = useState<UserRole>('student');

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
            const snap = await getDocs(q);
            const list: UserProfile[] = [];
            snap.forEach(d => {
                const data = d.data();
                list.push({
                    uid: d.id,
                    ...data,
                    createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date() // Handle timestamps
                } as UserProfile);
            });
            setUsers(list);
        } catch (e) {
            console.error("Failed to fetch users", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const startEdit = (user: UserProfile) => {
        setEditingId(user.uid);
        setTempRole(user.role);
    };

    const saveRole = async () => {
        if (!editingId) return;
        try {
            await updateDoc(doc(db, "users", editingId), { role: tempRole });
            setUsers(prev => prev.map(u => u.uid === editingId ? { ...u, role: tempRole } : u));
            setEditingId(null);
        } catch (e) {
            console.error("Failed to update role", e);
            alert("Failed to update role");
        }
    };

    const handleDelete = async (uid: string) => {
        if (!confirm("Are you sure you want to delete this user? (This only deletes database record)")) return;
        try {
            await deleteDoc(doc(db, "users", uid));
            setUsers(prev => prev.filter(u => u.uid !== uid));
        } catch (e) {
            console.error("Delete failed", e);
            alert("Failed to delete user");
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">User Management</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-gray-400">Loading users...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Joined</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {users.map((u) => (
                                    <tr key={u.uid} className="hover:bg-gray-50/50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                                                    <User size={16} />
                                                </div>
                                                <span className="font-medium text-gray-700">{u.displayName || 'Unknown'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{u.email}</td>
                                        <td className="px-6 py-4">
                                            {editingId === u.uid ? (
                                                <select
                                                    value={tempRole}
                                                    onChange={(e) => setTempRole(e.target.value as UserRole)}
                                                    className="border rounded px-2 py-1 text-xs"
                                                >
                                                    <option value="student">Student</option>
                                                    <option value="staff">Staff</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="bursar">Bursar</option>
                                                    <option value="dean">Dean</option>
                                                </select>
                                            ) : (
                                                <span className={`px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide
                                                    ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                                        u.role === 'staff' ? 'bg-amber-100 text-amber-700' :
                                                            u.role === 'student' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {u.role}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-xs">
                                            {new Date(u.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                                            {editingId === u.uid ? (
                                                <button onClick={saveRole} className="p-1 text-green-600 hover:bg-green-50 rounded">
                                                    <Check size={16} />
                                                </button>
                                            ) : (
                                                <button onClick={() => startEdit(u)} className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                                                    <Edit size={16} />
                                                </button>
                                            )}
                                            <button onClick={() => handleDelete(u.uid)} className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
