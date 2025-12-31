"use client";
import GenericModule, { FieldConfig } from "@/components/GenericModule";

const fields: FieldConfig[] = [
    { key: "reportName", label: "Report Name", type: "text", required: true },
    { key: "category", label: "Category", type: "select", options: ["Enrollment", "Financial", "Academic Performance", "Staff"] },
    { key: "generatedDate", label: "Date Generated", type: "date" },
    { key: "format", label: "Format", type: "select", options: ["PDF", "Excel", "CSV"] },
    { key: "accessLevel", label: "Confidentiality", type: "select", options: ["Public", "Internal", "Confidential"] },
];

export default function Page() {
    return (
        <GenericModule
            title="System Analytics & Reports"
            collectionPath="analytics_reports"
            fields={fields}
            role="admin"
        />
    );
}
