export type UserRole = 'student' | 'admin' | 'bursar' | 'group_leader';
export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export interface UserProfile {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    role: UserRole;
    status: VerificationStatus;
    batchId?: string; // e.g., '2022_Physical'
    indexNumber?: string; // Protected field
    phone?: string;
    address?: string;
    createdAt: any; // Timestamp
    updatedAt: any;
}

export interface AcademicRecord {
    uid: string;
    indexNumber: string;
    gpa: number;
    results: {
        dataset: string; // JSON string or object
    };
}

export interface Course {
    id: string;
    title: string;
    code: string;
    stream: string; // e.g., 'Physical Science'
    year: number; // 1, 2, 3, 4
    fees: {
        registration: number;
        exam: number;
        other?: number;
    };
}

export interface Payment {
    id: string;
    userId: string;
    courseId?: string; // or feeId
    amount: number;
    currency: 'LKR';
    method: 'card' | 'qr' | 'bank_transfer';
    status: 'pending_verification' | 'success' | 'failed';
    proofUrl?: string; // URL to slip image
    referenceNo?: string; // Bank ref no
    createdAt: any;
    verifiedBy?: string; // Admin UID
    verifiedAt?: any;
}
