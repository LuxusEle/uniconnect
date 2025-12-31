"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, query, where, doc, setDoc } from 'firebase/firestore';
import { Course, Enrollment } from '@/lib/firebase/schema';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';

export default function CourseRegistrationPage() {
    const { user } = useAuth();
    const [courses, setCourses] = useState<Course[]>([]);
    const [enrolledCourseIds, setEnrolledCourseIds] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState<string | null>(null);

    const fetchData = async () => {
        if (!user) return;
        setLoading(true);
        try {
            // 1. Fetch all available courses
            const coursesSnap = await getDocs(collection(db, "courses"));
            const coursesList: Course[] = [];
            coursesSnap.forEach(doc => {
                coursesList.push({ id: doc.id, ...doc.data() } as Course);
            });
            setCourses(coursesList);

            // 2. Fetch student's current enrollments
            const enrollQuery = query(collection(db, "enrollments"), where("studentId", "==", user.uid));
            const enrollSnap = await getDocs(enrollQuery);
            const enrolled = new Set<string>();
            enrollSnap.forEach(doc => {
                enrolled.add(doc.data().courseId);
            });
            setEnrolledCourseIds(enrolled);

        } catch (error) {
            console.error("Error fetching registration data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user]);

    const handleEnroll = async (course: Course) => {
        if (!user) return;
        setProcessing(course.id);
        try {
            // Create Enrollment Record
            const enrollmentData: Omit<Enrollment, 'id'> = {
                studentId: user.uid,
                courseId: course.id,
                semester: "2025/S1", // Hardcoded for demo
                status: 'enrolled',
                attendance: 0,
                marks: {}
            };

            await addDoc(collection(db, "enrollments"), enrollmentData);

            // Refresh local state
            setEnrolledCourseIds(prev => new Set(prev).add(course.id));
            alert(`Successfully enrolled in ${course.title}`);
        } catch (error) {
            console.error("Enrollment failed:", error);
            alert("Failed to enroll. Please try again.");
        } finally {
            setProcessing(null);
        }
    };

    const seedCourses = async () => {
        if (!confirm("Are you sure you want to seed default courses?")) return;
        setLoading(true);
        try {
            const defaultCourses: Course[] = [
                { id: "CS101", title: "Introduction to Computer Science", description: "Fundamental concepts of computing.", credits: 3, department: "CS", semester: 1, prerequisites: [], ilos: ["Understand basic algorithms"] },
                { id: "CS102", title: "Data Structures & Algorithms", description: "Advanced data organization.", credits: 4, department: "CS", semester: 2, prerequisites: ["CS101"], ilos: ["Implement trees and graphs"] },
                { id: "MA101", title: "Calculus I", description: "Limits, derivatives, and integrals.", credits: 3, department: "Math", semester: 1, prerequisites: [], ilos: ["Solve derivatives"] },
                { id: "ENG101", title: "Technical Communication", description: "Writing and speaking for engineers.", credits: 2, department: "English", semester: 1, prerequisites: [], ilos: ["Write technical reports"] },
                { id: "DB201", title: "Database Systems", description: "SQL and NoSQL database design.", credits: 3, department: "CS", semester: 3, prerequisites: ["CS102"], ilos: ["Design normalized schema"] }
            ];

            for (const c of defaultCourses) {
                // Use setDoc with custom ID (Course Code)
                await setDoc(doc(db, "courses", c.id), c);
            }
            await fetchData();
            alert("Courses seeded successfully!");
        } catch (e) {
            console.error(e);
            alert("Seeding failed.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center animate-pulse">Loading available courses...</div>;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Course Registration</h1>
                    <p className="text-sm text-gray-500">Select modules for the upcoming semester (2025/S1)</p>
                </div>
                {courses.length === 0 && (
                    <button onClick={seedCourses} className="text-xs bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded">
                        Dev: Seed Courses
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => {
                    const isEnrolled = enrolledCourseIds.has(course.id);
                    return (
                        <div key={course.id} className={`bg-white rounded-xl shadow-sm border p-6 flex flex-col justify-between ${isEnrolled ? 'border-green-200 bg-green-50/30' : 'border-gray-100'}`}>
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-wider">{course.id}</span>
                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                        <Clock size={12} /> {course.credits} Credits
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">{course.title}</h3>
                                <p className="text-sm text-gray-500 mb-4 line-clamp-3">{course.description}</p>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                {isEnrolled ? (
                                    <button disabled className="w-full py-2 bg-green-100 text-green-700 font-semibold rounded-lg flex items-center justify-center gap-2 cursor-default">
                                        <CheckCircle size={18} />
                                        Enrolled
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEnroll(course)}
                                        disabled={!!processing}
                                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        <BookOpen size={18} />
                                        {processing === course.id ? "Enrolling..." : "Enroll Now"}
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}

                {courses.length === 0 && (
                    <div className="col-span-3 text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500">No courses available for registration at this time.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
