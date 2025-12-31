"use client";
import GenericModule, { FieldConfig } from "@/components/GenericModule";

const fields: FieldConfig[] = [
    { key: "studentId", label: "Student ID", type: "text", required: true },
    { key: "installment", label: "Installment Month", type: "select", options: ["January", "February", "March", "April", "May", "June"], required: true },
    { key: "amount", label: "Amount (LKR)", type: "number", required: true }, // Default 5000 in logic
    { key: "bankAccount", label: "Bank Account No", type: "text", required: true },
    { key: "status", label: "Disbursement Status", type: "select", options: ["Pending", "Processing", "Disbursed"] },
];

export default function Page() {
    return (
        <GenericModule
            title="Mahapola Scholarship Management"
            collectionPath="financial_mahapola"
            fields={fields}
            role="student"
            filterByUser={true}
        />
    );
}
