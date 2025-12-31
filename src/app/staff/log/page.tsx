"use client";
import GenericModule, { FieldConfig } from "@/components/GenericModule";

const fields: FieldConfig[] = [
    { key: "date", label: "Date", type: "date", required: true },
    { key: "activityType", label: "Main Activity", type: "select", options: ["Lecture", "Paper Setting", "Paper Marking", "Research", "Admin Duty"], required: true },
    { key: "description", label: "Description of Work", type: "text", required: true },
    { key: "hours", label: "Hours Spent", type: "number", required: true },
    { key: "courseCode", label: "Related Course (if any)", type: "text" },
];

export default function Page() {
    return (
        <GenericModule
            title="Academic Accountability Log"
            collectionPath="staff_worklog"
            fields={fields}
            role="staff"
            filterByUser={true}
        />
    );
}
