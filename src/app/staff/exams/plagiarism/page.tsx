"use client";
import GenericModule, { FieldConfig } from "@/components/GenericModule";

const fields: FieldConfig[] = [
    { key: "studentId", label: "Student ID", type: "text", required: true },
    { key: "documentTitle", label: "Document Title", type: "text", required: true },
    { key: "similarity", label: "Similarity Index (%)", type: "number", required: true },
    { key: "checkDate", label: "Date Checked", type: "date" },
    { key: "status", label: "Status", type: "select", options: ["Accepted", "Rejected - High Similarity", "Pending Review"] },
];

export default function Page() {
    return (
        <GenericModule
            title="Plagiarism Checks (Authenticate)"
            collectionPath="staff_plagiarism"
            fields={fields}
            role="staff"
        />
    );
}
