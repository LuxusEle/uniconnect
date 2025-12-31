export type UserRole = 'student' | 'staff' | 'admin' | 'dean' | 'bursar';

export interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    role: UserRole;
    createdAt: Date;
    lastLogin?: Date;
}

export interface StudentProfile extends UserProfile {
    studentId: string;
    batch: string; // e.g., "2023/2024"
    faculty: string;
    department: string;
    gpa: number;
    creditsEarned: number;
    attendanceRate: number; // Percentage
}

export interface StaffProfile extends UserProfile {
    staffId: string;
    department: string;
    designation: string; // e.g., "Senior Lecturer"
    qualifications: string[];
}

export interface Course {
    id: string; // Course Code, e.g., "CS101"
    title: string;
    description: string;
    credits: number;
    department: string;
    semester: number;
    prerequisites: string[]; // List of Course IDs
    ilos: string[]; // Intended Learning Outcomes
}

export interface Enrollment {
    id: string;
    studentId: string;
    courseId: string;
    semester: string; // e.g., "Semester 1 2024"
    status: 'enrolled' | 'completed' | 'dropped';
    attendance: number; // Percentage
    marks: {
        ca?: number; // Continuous Assessment
        final?: number;
    };
    grade?: string;
}

export interface FinanceTransaction {
    id: string;
    studentId: string;
    type: 'fee' | 'payment' | 'scholarship' | 'credit' | 'debit';
    category: 'semester_fee' | 'exam_fee' | 'hostel_fee' | 'mahapola' | 'bursary';
    amount: number;
    currency: 'LKR';
    date: Date;
    status: 'pending' | 'completed' | 'failed';
    description: string;
}

export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'error' | 'success';
    read: boolean;
    createdAt: Date;
}
