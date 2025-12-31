"use client";
import GenericModule, { FieldConfig } from "@/components/GenericModule";

const fields: FieldConfig[] = [
    { key: "sessionType", label: "Type", type: "select", options: ["Career Counseling", "Mock Interview", "CV Review", "Industry Visit"], required: true },
    { key: "preferredDate", label: "Preferred Date", type: "date", required: true },
    { key: "notes", label: "Specific Questions / Goals", type: "text" },
    { key: "status", label: "Request Status", type: "select", options: ["Pending", "Confirmed", "Completed"] },
];

export default function Page() {
    return (
        <GenericModule
            title="Career Guidance & Counseling"
            collectionPath="welfare_career"
            fields={fields}
            role="student"
            filterByUser={true}
        />
    );
}
