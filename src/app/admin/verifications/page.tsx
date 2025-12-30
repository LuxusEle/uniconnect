"use client";
import DocumentViewer from "@/components/admin/DocumentViewer";
import { useState } from "react";

// Mock Data
const MOCK_QUEUE = [
    {
        id: "1",
        studentName: "Kasun Perera",
        nic: "981234567V",
        docType: "NIC",
        docUrl: "", // Will use placeholder
        submittedAt: "2023-10-25 09:30 AM",
    },
    {
        id: "2",
        studentName: "Amara Silva",
        nic: "200012345678",
        docType: "ResultSheet",
        docUrl: "",
        submittedAt: "2023-10-25 10:15 AM",
    },
] as const;

export default function VerificationsPage() {
    const [queue, setQueue] = useState(MOCK_QUEUE);
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentItem = queue[currentIndex];

    const handleApprove = (id: string) => {
        // In real app, call API
        console.log("Approved", id);
        nextItem();
    };

    const handleReject = (id: string, reason: string) => {
        console.log("Rejected", id, reason);
        nextItem();
    };

    const nextItem = () => {
        if (currentIndex < queue.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            alert("Queue cleared!");
        }
    };

    if (!currentItem) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">All caught up!</h2>
                <p className="text-gray-500 mt-2">No documents pending verification.</p>
            </div>
        )
    }

    return (
        <div>
            <header className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Document Verification Queue</h1>
                <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                    {queue.length - currentIndex} Pending
                </span>
            </header>

            <DocumentViewer
                item={currentItem}
                onApprove={handleApprove}
                onReject={handleReject}
            />
        </div>
    );
}
