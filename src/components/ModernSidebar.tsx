"use client";

import React, { useState, useEffect } from "react";
import {
    LayoutDashboard, BookOpen, Users, GraduationCap, Calendar, Library, CreditCard,
    FileText, Settings, Activity, UserCheck, Heart, Briefcase, Landmark, ClipboardList,
    BarChart, Wallet, Building, Stethoscope, Microscope, Globe, ShieldCheck
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/firebase/schema";

interface SidebarProps {
    role?: UserRole;
}

// Define the menu structure with sections
type MenuItem = {
    id: string;
    label: string;
    icon: React.ElementType;
    path: string;
    color: string;
};

type MenuSection = {
    title?: string;
    items: MenuItem[];
};

const ModernSidebar = ({ role: propRole }: SidebarProps) => {
    const { role: authRole } = useAuth();
    const role = propRole || authRole || 'student';

    const router = useRouter();
    const pathname = usePathname();
    const [activeItem, setActiveItem] = useState("Dashboard");

    // Sync active item
    useEffect(() => {
        const currentPath = pathname.split('/').pop();
        if (currentPath) {
            // Search through all sections to find the matching item
            let foundLabel = "Dashboard";
            // @ts-ignore
            const roleMenus = menus[role] || menus.student;

            // @ts-ignore
            roleMenus.forEach(section => {
                const match = section.items.find((item: MenuItem) => item.path.includes(currentPath));
                if (match) foundLabel = match.label;
            });
            setActiveItem(foundLabel);
        }
    }, [pathname, role]);

    const menus = {
        student: [
            {
                title: "Overview",
                items: [
                    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'from-blue-600 to-blue-400', path: "/dashboard" },
                ]
            },
            {
                title: "Academic Affairs",
                items: [
                    { id: 'reg', label: 'Course Reg.', icon: BookOpen, color: 'from-blue-600 to-blue-400', path: "/dashboard/academics/registration" },
                    { id: 'mycourses', label: 'My Courses', icon: Library, color: 'from-blue-600 to-blue-400', path: "/dashboard/academics" }, // Kept existing path for My Courses
                    { id: 'results', label: 'Results', icon: GraduationCap, color: 'from-blue-600 to-blue-400', path: "/dashboard/results" },
                    { id: 'attendance', label: 'Attendance', icon: UserCheck, color: 'from-blue-600 to-blue-400', path: "/dashboard/academics/attendance" },
                ]
            },
            {
                title: "Financial Services",
                items: [
                    { id: 'wallet', label: 'My Wallet', icon: Wallet, color: 'from-blue-600 to-blue-400', path: "/dashboard/financial/wallet" },
                    { id: 'fees', label: 'Fees', icon: CreditCard, color: 'from-blue-600 to-blue-400', path: "/dashboard/fees" },
                    { id: 'mahapola', label: 'Mahapola', icon: Landmark, color: 'from-blue-600 to-blue-400', path: "/dashboard/financial/mahapola" },
                    { id: 'bursary', label: 'Bursary', icon: FileText, color: 'from-blue-600 to-blue-400', path: "/dashboard/financial/bursary" },
                ]
            },
            {
                title: "Student Welfare",
                items: [
                    { id: 'hostel', label: 'Hostel', icon: Building, color: 'from-blue-600 to-blue-400', path: "/dashboard/welfare/hostel" },
                    { id: 'health', label: 'Health Centre', icon: Stethoscope, color: 'from-blue-600 to-blue-400', path: "/dashboard/welfare/health" },
                    { id: 'career', label: 'Career Guidance', icon: Briefcase, color: 'from-blue-600 to-blue-400', path: "/dashboard/welfare/career" },
                ]
            }
        ],
        staff: [
            {
                title: "Overview",
                items: [
                    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'from-amber-600 to-amber-400', path: "/staff" },
                    { id: 'schedule', label: 'Schedule', icon: Calendar, color: 'from-amber-600 to-amber-400', path: "/staff/schedule" },
                    { id: 'tasks', label: 'Tasks', icon: ClipboardList, color: 'from-amber-600 to-amber-400', path: "/staff/tasks" },
                    { id: 'log', label: 'Work Log', icon: FileText, color: 'from-amber-600 to-amber-400', path: "/staff/log" },
                ]
            },
            {
                title: "Course Management",
                items: [
                    { id: 'modules', label: 'Modules', icon: BookOpen, color: 'from-amber-600 to-amber-400', path: "/staff/modules" },
                    { id: 'content', label: 'Upload Content', icon: Library, color: 'from-amber-600 to-amber-400', path: "/staff/modules/content" },
                    { id: 'attendance', label: 'Digital Roll', icon: UserCheck, color: 'from-amber-600 to-amber-400', path: "/staff/modules/attendance" },
                    { id: 'eligibility', label: 'Eligibility', icon: ShieldCheck, color: 'from-amber-600 to-amber-400', path: "/staff/modules/eligibility" },
                ]
            },
            {
                title: "Exams & Grading",
                items: [
                    { id: 'grading', label: 'Grading', icon: GraduationCap, color: 'from-amber-600 to-amber-400', path: "/staff/grading" },
                    { id: 'marks', label: 'Enter Marks', icon: FileText, color: 'from-amber-600 to-amber-400', path: "/staff/exams/marks" },
                    { id: 'plagiarism', label: 'Plagiarism Check', icon: Microscope, color: 'from-amber-600 to-amber-400', path: "/staff/exams/plagiarism" },
                ]
            },
            {
                title: "Research",
                items: [
                    { id: 'pubs', label: 'Publications', icon: BookOpen, color: 'from-amber-600 to-amber-400', path: "/staff/research/pubs" },
                    { id: 'grants', label: 'Grants', icon: Landmark, color: 'from-amber-600 to-amber-400', path: "/staff/research/grants" },
                ]
            }
        ],
        admin: [
            {
                title: "Leadership",
                items: [
                    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, color: 'from-red-600 to-red-400', path: "/admin" },
                    { id: 'analytics', label: 'Analytics', icon: BarChart, color: 'from-red-600 to-red-400', path: "/admin/strategic/analytics" },
                    { id: 'qa', label: 'QA Metrics', icon: ShieldCheck, color: 'from-red-600 to-red-400', path: "/admin/strategic/qa" },
                    { id: 'planning', label: 'Strategic Plan', icon: Globe, color: 'from-red-600 to-red-400', path: "/admin/strategic/planning" },
                ]
            },
            {
                title: "Registrar",
                items: [
                    { id: 'users', label: 'Users', icon: Users, color: 'from-red-600 to-red-400', path: "/admin/users" }, // Existing path
                    { id: 'courses', label: 'Curriculum', icon: Library, color: 'from-red-600 to-red-400', path: "/admin/courses" }, // Existing path
                    { id: 'exams', label: 'Exam Sched.', icon: Calendar, color: 'from-red-600 to-red-400', path: "/admin/registrar/exams" },
                    { id: 'mou', label: 'Intl. MoU', icon: Globe, color: 'from-red-600 to-red-400', path: "/admin/registrar/mou" },
                ]
            },
            {
                title: "Finance",
                items: [
                    { id: 'finance', label: 'Finance Home', icon: Activity, color: 'from-red-600 to-red-400', path: "/admin/finance" },
                    { id: 'fees', label: 'Fee Tracking', icon: CreditCard, color: 'from-red-600 to-red-400', path: "/admin/finance/fees" },
                    { id: 'funds', label: 'Funds', icon: Landmark, color: 'from-red-600 to-red-400', path: "/admin/finance/funds" },
                    { id: 'assets', label: 'Assets', icon: Building, color: 'from-red-600 to-red-400', path: "/admin/finance/assets" },
                    { id: 'audit', label: 'Internal Audit', icon: FileText, color: 'from-red-600 to-red-400', path: "/admin/finance/audit" },
                ]
            },
            {
                title: "System",
                items: [
                    { id: 'settings', label: 'Config', icon: Settings, color: 'from-red-600 to-red-400', path: "/admin/settings" },
                ]
            }
        ],
        bursar: [
            {
                title: "Finance",
                items: [
                    { id: 'dashboard', label: 'Finance', icon: LayoutDashboard, color: 'from-green-600 to-green-400', path: "/bursar" },
                    { id: 'reconcile', label: 'Reconcile', icon: FileText, color: 'from-green-600 to-green-400', path: "/bursar/reconcile" }
                ]
            }
        ],
        dean: []
    };

    const currentMenus = (menus[role as keyof typeof menus] || menus.student) as MenuSection[];

    const handleNavigation = (path: string, label: string) => {
        setActiveItem(label);
        router.push(path);
    };

    return (
        <div
            className="fixed left-4 top-4 bottom-4 w-64 rounded-xl z-50 flex flex-col shadow-2xl overflow-hidden font-sans"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* Brand */}
            <div className="p-6 flex items-center gap-3 border-b border-white/20">
                <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-gray-900 font-bold">U</div>
                <span className="text-white font-medium text-sm tracking-wide uppercase">UniConnect</span>
            </div>

            {/* Menu */}
            <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
                {currentMenus.map((section, index) => (
                    <div key={index}>
                        {section.title && (
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-4">
                                {section.title}
                            </h4>
                        )}
                        <div className="space-y-1">
                            {section.items.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeItem === item.label;

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleNavigation(item.path, item.label)}
                                        className={`
                                            w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-light transition-all duration-300
                                            ${isActive
                                                ? `bg-gradient-to-tr ${item.color} shadow-lg shadow-black/30 text-white font-medium`
                                                : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                            }
                                        `}
                                    >
                                        <Icon size={18} className={isActive ? 'text-white' : 'text-gray-300'} />
                                        <span>{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="p-4 text-center border-t border-white/10">
                <p className="text-xs text-gray-400">v3.1 UMS Blueprint</p>
            </div>
        </div>
    );
};

export default ModernSidebar;
