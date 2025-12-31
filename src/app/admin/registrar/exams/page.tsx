"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { Course } from '@/lib/firebase/schema';
import { Calendar, Clock, MapPin, Plus, Trash2 } from 'lucide-react';

interface Exam {
    id: string;
    courseId: string;
    courseTitle: string;
    date: Date;
    time: string;
    venue: string;
}

export default function ExamSchedulingPage() {
    const [exams, setExams] = useState<Exam[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [selectedCourse, setSelectedCourse] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [venue, setVenue] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const loadloData = async () => {
            setLoading(true);
            try {
                // Fetch Courses
                const cSnap = await getDocs(collection(db, "courses"));
                const cList: Course[] = [];
                cSnap.forEach(d => cList.push({ id: d.id, ...d.data() } as Course));
                setCourses(cList);

                // Fetch Exams
                const eQuery = query(collection(db, "exams"), orderBy("date", "asc"));
                const eSnap = await getDocs(eQuery);
                const eList: Exam[] = [];
                eSnap.forEach(d => {
                    const data = d.data();
                    eList.push({
                        id: d.id,
                        ...data,
                        date: data.date.toDate()
                    } as Exam);
                });
                setExams(eList);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        loadloData();
    }, []);

    const handleSchedule = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCourse || !date || !time || !venue) return;
        setSubmitting(true);
        try {
            const course = courses.find(c => c.id === selectedCourse);
            const examData = {
                courseId: selectedCourse,
                courseTitle: course?.title || selectedCourse,
                date: new Date(date),
                time,
                venue,
                createdAt: new Date()
            };

            const ref = await addDoc(collection(db, "exams"), examData);
            setExams(prev => [...prev, { id: ref.id, ...examData }]);

            // Reset form
            setDate("");
            setTime("");
            setVenue("");
            alert("Exam scheduled successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to schedule exam");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this exam schedule?")) return;
        try {
            await deleteDoc(doc(db, "exams", id));
            setExams(prev => prev.filter(e => e.id !== id));
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Exam Scheduling</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Schedule Form */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
                    <h2 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <Plus size={18} />
                        Schedule New Exam
                    </h2>
                    <form onSubmit={handleSchedule} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Course</label>
                            <select
                                required
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                                className="w-full p-2 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="">Select Course...</option>
                                {courses.map(c => <option key={c.id} value={c.id}>{c.id} - {c.title}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Date</label>
                            <input
                                type="date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full p-2 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Time</label>
                            <input
                                type="time"
                                required
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full p-2 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Venue</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Exam Hall 1"
                                value={venue}
                                onChange={(e) => setVenue(e.target.value)}
                                className="w-full p-2 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            {submitting ? "Scheduling..." : "Schedule Exam"}
                        </button>
                    </form>
                </div>

                {/* Exam List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50 font-bold text-gray-700">
                            Upcoming Exams
                        </div>
                        {loading ? (
                            <div className="p-8 text-center text-gray-400">Loading schedule...</div>
                        ) : exams.length === 0 ? (
                            <div className="p-8 text-center text-gray-400">No exams scheduled.</div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {exams.map(exam => (
                                    <div key={exam.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-gray-50 transition-colors group">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{exam.courseId}</span>
                                                <h3 className="font-bold text-gray-800">{exam.courseTitle}</h3>
                                            </div>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    {exam.date.toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    {exam.time}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin size={14} />
                                                    {exam.venue}
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(exam.id)}
                                            className="mt-2 sm:mt-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
                                            title="Delete Exam"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
