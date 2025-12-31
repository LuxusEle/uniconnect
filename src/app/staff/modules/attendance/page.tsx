"use client";
import GenericModule, { FieldConfig } from "@/components/GenericModule";

const fields: FieldConfig[] = [
    { key: "date", label: "Date", type: "date", required: true },
    { key: "courseCode", label: "Course", type: "text", required: true },
    { key: "totalStudents", label: "Total Students", type: "number" },
    { key: "presentCount", label: "Present Count", type: "number" },
    { key: "absentCount", label: "Absent Count", type: "number" },
];

export default function Page() {
    return (
        <GenericModule
            title="Digital Roll Call Summary"
            collectionPath="staff_attendance_summary"
            fields={fields}
            role="staff"
            filterByUser={true}
        />
    );
}
