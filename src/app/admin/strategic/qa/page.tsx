"use client";
import GenericModule, { FieldConfig } from "@/components/GenericModule";

const fields: FieldConfig[] = [
    { key: "title", label: "Goal / Objective", type: "text", required: true },
    { key: "metric", label: "Success Metric", type: "text", required: true },
    { key: "targetDate", label: "Target Date", type: "date", required: true },
    { key: "priority", label: "Priority", type: "select", options: ["High", "Medium", "Low"], required: true },
    { key: "owner", label: "Assigned To", type: "text" },
];

export default function QAPage() {
    return (
        <GenericModule
            title="Quality Assurance Goals"
            collectionPath="qa_goals"
            fields={fields}
            role="admin"
        />
    );
}
