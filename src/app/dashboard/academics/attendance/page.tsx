"use client";
import GenericModule, { FieldConfig } from "@/components/GenericModule";

const fields: FieldConfig[] = [
    { key: "courseCode", label: "Course Unit", type: "text", required: true },
    { key: "date", label: "Date", type: "date", required: true },
    { key: "duration", label: "Duration (Hours)", type: "number" },
    { key: "status", label: "Attendance", type: "select", options: ["Present", "Absent", "Excused"] },
];

export default function Page() {
    return (
        <GenericModule
            title="My Attendance Record"
            collectionPath="academic_attendance"
            fields={fields}
            role="student"
            filterByUser={true}
        />
    );
}
