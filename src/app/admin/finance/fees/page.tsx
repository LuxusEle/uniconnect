"use client";
import GenericModule, { FieldConfig } from "@/components/GenericModule";

const fields: FieldConfig[] = [
    { key: "studentId", label: "Student Reg. No", type: "text", required: true },
    { key: "feeType", label: "Fee Type", type: "select", options: ["Registration", "Exam Fee", "Library Fine", "Hostel Fee"], required: true },
    { key: "amount", label: "Amount (LKR)", type: "number", required: true },
    { key: "paymentDate", label: "Payment Date", type: "date" },
    { key: "receiptNo", label: "Receipt / Ref No", type: "text" },
    { key: "status", label: "Verification Status", type: "select", options: ["Pending", "Verified", "Rejected"] },
];

export default function Page() {
    return (
        <GenericModule
            title="Student Fee Tracking"
            collectionPath="finance_fees"
            fields={fields}
            role="admin"
        />
    );
}
