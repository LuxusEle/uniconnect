"use client";
import GenericModule, { FieldConfig } from "@/components/GenericModule";

const fields: FieldConfig[] = [
    { key: "courseCode", label: "Course Code", type: "text", required: true },
    { key: "studentId", label: "Student ID", type: "text", required: true },
    { key: "attendance", label: "Attendance %", type: "number", required: true },
    { key: "eligibility", label: "Exam Eligibility", type: "select", options: ["Eligible", "Not Eligible"], required: true },
    { key: "reason", label: "Reason (if ineligible)", type: "text" },
];

export default function Page() {
    return (
        <GenericModule
            title="Exam Eligibility Reports"
            collectionPath="staff_eligibility"
            fields={fields}
            role="staff"
        />
    );
}
