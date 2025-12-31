"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { Course, Enrollment, StudentProfile } from '@/lib/firebase/schema';
import { User, Book, Save } from 'lucide-react';

interface GradeRow {
    enrollmentId: string;
    studentId: string;
    studentName?: string;
    ca: number;
    final: number;
    grade?: string;
    isDirty: boolean; // Track if changes need saving
}

export default function StaffGradingPage() {
    const { user } = useAuth();
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<string>('');
    const [students, setStudents] = useState<GradeRow[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    // 1. Fetch Courses for dropdown
    useEffect(() => {
        const fetchCourses = async () => {
            const snap = await getDocs(collection(db, "courses"));
            const list: Course[] = [];
            snap.forEach(d => list.push({ id: d.id, ...d.data() } as Course));
            setCourses(list);
            if (list.length > 0) setSelectedCourse(list[0].id);
        };
        fetchCourses();
    }, []);

    // 2. Fetch Students when course changes
    useEffect(() => {
        if (!selectedCourse) return;

        const fetchEnrollments = async () => {
            setLoading(true);
            try {
                // Get enrollments for this course
                const q = query(collection(db, "enrollments"), where("courseId", "==", selectedCourse));
                const snap = await getDocs(q);

                const rows: GradeRow[] = [];
                for (const d of snap.docs) {
                    const data = d.data() as Enrollment;
                    // Ideally we fetch student profile name here, but for now we might just show ID or fake it
                    // Let's try to fetch user name if possible, or just ID
                    // Optimization: We could fetch all users once or just rely on ID

                    rows.push({
                        enrollmentId: d.id,
                        studentId: data.studentId,
                        ca: data.marks.ca || 0,
                        final: data.marks.final || 0,
                        grade: data.grade || '-',
                        isDirty: false
                    });
                }
                setStudents(rows);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchEnrollments();
    }, [selectedCourse]);

    const handleMarkChange = (index: number, field: 'ca' | 'final', value: string) => {
        const val = parseFloat(value) || 0;
        const newStudents = [...students];
        newStudents[index] = {
            ...newStudents[index],
            [field]: val,
            isDirty: true
        };
        setStudents(newStudents);
    };

    const saveGrades = async () => {
        setSaving(true);
        try {
            const updates = students.filter(s => s.isDirty);
            for (const s of updates) {
                const total = s.ca + s.final;
                // Simple grading scale
                let grade = 'F';
                if (total >= 80) grade = 'A';
                else if (total >= 70) grade = 'B';
                else if (total >= 60) grade = 'C';
                else if (total >= 50) grade = 'D';

                await updateDoc(doc(db, "enrollments", s.enrollmentId), {
                    "marks.ca": s.ca,
                    "marks.final": s.final,
                    "grade": grade
                });
            }
            // Reset dirty flags
            setStudents(prev => prev.map(s => ({ ...s, isDirty: false, grade: (s.ca + s.final) >= 80 ? 'A' : (s.ca + s.final) >= 70 ? 'B' : (s.ca + s.final) >= 60 ? 'C' : (s.ca + s.final) >= 50 ? 'D' : 'F' }))); // Update locally roughly
            alert("Grades saved successfully!");
        } catch (e) {
            console.error(e);
            alert("Failed to save grades.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Grading Portal</h1>
                    <p className="text-sm text-gray-500">Enter CA and Final marks for enrolled students</p>
                </div>

                <div className="flex items-center gap-4 bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                    <span className="text-sm font-medium text-gray-600 pl-2">Select Course:</span>
                    <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="bg-gray-50 border-none outline-none text-sm font-bold text-blue-600 focus:ring-0 py-1"
                    >
                        {courses.map(c => <option key={c.id} value={c.id}>{c.id} - {c.title}</option>)}
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="font-bold text-gray-700 flex items-center gap-2">
                        <Book size={18} />
                        Student List
                    </h2>
                    <button
                        onClick={saveGrades}
                        disabled={saving || !students.some(s => s.isDirty)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <Save size={16} />
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>

                {loading ? (
                    <div className="p-12 text-center text-gray-400">Loading student list...</div>
                ) : students.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Student ID</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 w-32">CA (40%)</th>
                                    <th className="px-6 py-4 w-32">Final (60%)</th>
                                    <th className="px-6 py-4 w-24">Total</th>
                                    <th className="px-6 py-4 w-24">Grade</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {students.map((student, idx) => (
                                    <tr key={student.enrollmentId} className="hover:bg-gray-50/50">
                                        <td className="px-6 py-4 font-medium text-gray-700 flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                                                {student.studentId.substring(0, 2).toUpperCase()}
                                            </div>
                                            {student.studentId}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">Enrolled</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <input
                                                type="number"
                                                min="0" max="40"
                                                value={student.ca}
                                                onChange={(e) => handleMarkChange(idx, 'ca', e.target.value)}
                                                className="w-full px-3 py-1 border rounded focus:ring-2 focus:ring-blue-500 outline-none text-center font-mono"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <input
                                                type="number"
                                                min="0" max="60"
                                                value={student.final}
                                                onChange={(e) => handleMarkChange(idx, 'final', e.target.value)}
                                                className="w-full px-3 py-1 border rounded focus:ring-2 focus:ring-blue-500 outline-none text-center font-mono"
                                            />
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-800">
                                            {student.ca + student.final}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`font-bold ${student.grade === 'F' ? 'text-red-600' : 'text-green-600'}`}>{student.grade}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-12 text-center flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                            <User size={24} />
                        </div>
                        <p className="text-gray-500">No students enrolled in this course yet.</p>
                        <p className="text-xs text-gray-400">Students must enroll via their dashboard first.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
