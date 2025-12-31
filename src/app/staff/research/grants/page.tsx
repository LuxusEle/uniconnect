"use client";
import GenericModule, { FieldConfig } from "@/components/GenericModule";

const fields: FieldConfig[] = [
    { key: "grantTitle", label: "Grant Title", type: "text", required: true },
    { key: "agency", label: "Funding Agency", type: "text", required: true },
    { key: "amount", label: "Amount (LKR/USD)", type: "number", required: true },
    { key: "startDate", label: "Start Date", type: "date" },
    { key: "duration", label: "Duration (Months)", type: "number" },
    { key: "status", label: "Status", type: "select", options: ["Active", "Completed", "Applied"] },
];

export default function Page() {
    return (
        <GenericModule
            title="Research Grants"
            collectionPath="staff_grants"
            fields={fields}
            role="staff"
            filterByUser={true}
        />
    );
}
