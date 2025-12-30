"use client";
import React, { useState } from 'react';
import { MOCK_STUDENT_RESULTS } from '@/lib/mockData';
import MaterialCard from '@/components/MaterialCard';
import { Download, ChevronDown, Award, BookOpen } from 'lucide-react';

export default function StudentResultsPage() {
    const [selectedSem, setSelectedSem] = useState("All Semesters");

    // Calculate Cumulative Data
    const totalCredits = MOCK_STUDENT_RESULTS.reduce((acc, sem) => acc + sem.credits, 0);
    const totalPoints = MOCK_STUDENT_RESULTS.reduce((acc, sem) => acc + (sem.gpa * sem.credits), 0);
    const cgpa = totalPoints > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";

    const displayedResults = selectedSem === "All Semesters"
        ? MOCK_STUDENT_RESULTS
        : MOCK_STUDENT_RESULTS.filter(s => s.semester === selectedSem);

    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Academic Results</h1>
                    <p className="text-gray-500 dark:text-gray-400">View your grades and academic performance.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-colors">
                    <Download size={18} />
                    <span>Download Transcript</span>
                </button>
            </header>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MaterialCard
                    title="Current CGPA"
                    subTitle="Cumulative Grade Point Average"
                    icon={<Award size={24} />}
                    color="from-purple-600 to-purple-400"
                >
                    <p className="text-4xl font-bold text-gray-800 dark:text-white mt-4">{cgpa}</p>
                    <p className="text-xs text-green-500 font-semibold mt-2">Excellent Standing</p>
                </MaterialCard>

                <MaterialCard
                    title="Total Credits"
                    subTitle="Earned Credits"
                    icon={<BookOpen size={24} />}
                    color="from-blue-600 to-blue-400"
                >
                    <p className="text-4xl font-bold text-gray-800 dark:text-white mt-4">{totalCredits}</p>
                    <p className="text-xs text-gray-400 mt-2">Required for Graduation: 120</p>
                </MaterialCard>

                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-lg font-bold opacity-90">Class Ranking</h3>
                        <p className="text-xs opacity-60 mb-6">Batch 2023/2024</p>
                        <div className="text-4xl font-bold">Top 10%</div>
                        <p className="text-xs text-emerald-400 mt-2">↑ Top tier performance</p>
                    </div>
                    {/* Decor */}
                    <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                </div>
            </div>

            {/* Filter */}
            <div className="flex justify-end mt-8">
                <div className="relative">
                    <select
                        value={selectedSem}
                        onChange={(e) => setSelectedSem(e.target.value)}
                        className="appearance-none bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 py-2 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer"
                    >
                        <option>All Semesters</option>
                        {MOCK_STUDENT_RESULTS.map(s => <option key={s.id}>{s.semester}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Results Tables */}
            <div className="space-y-8">
                {displayedResults.map((semester) => (
                    <div key={semester.id} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-soft-xl overflow-hidden border border-gray-100 dark:border-zinc-800">
                        <div className="p-6 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center bg-gray-50/50 dark:bg-zinc-800/30">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800 dark:text-white">{semester.semester}</h2>
                                <div className="flex gap-4 mt-1 text-xs text-gray-500">
                                    <span>GPA: <strong className="text-gray-900 dark:text-gray-300">{semester.gpa}</strong></span>
                                    <span>Credits: <strong className="text-gray-900 dark:text-gray-300">{semester.credits}</strong></span>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${semester.status === 'Pass' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700'}`}>
                                {semester.status}
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 dark:border-zinc-800 text-gray-500 font-medium">
                                        <th className="p-4 pl-6">Code</th>
                                        <th className="p-4">Course Title</th>
                                        <th className="p-4 text-center">Credits</th>
                                        <th className="p-4 text-center">Grade</th>
                                        <th className="p-4 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-zinc-800">
                                    {semester.courses.map((course, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/50 transition-colors">
                                            <td className="p-4 pl-6 font-mono text-xs text-gray-600 dark:text-gray-400">{course.code}</td>
                                            <td className="p-4 font-medium text-gray-800 dark:text-gray-200">{course.title}</td>
                                            <td className="p-4 text-center text-gray-600 dark:text-gray-400">{course.credits}</td>
                                            <td className="p-4 text-center">
                                                <span className={`font-bold ${course.grade.startsWith('A') ? 'text-green-600' : course.grade.startsWith('B') ? 'text-blue-600' : 'text-orange-500'}`}>
                                                    {course.grade}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded border border-green-100 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
                                                    {course.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
