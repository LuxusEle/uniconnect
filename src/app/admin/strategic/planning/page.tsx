"use client";
import GenericModule, { FieldConfig } from "@/components/GenericModule";

const fields: FieldConfig[] = [
    { key: "initiative", label: "Initiative Name", type: "text", required: true },
    { key: "pillar", label: "Strategic Pillar", type: "select", options: ["Academic Excellence", "Admin Efficiency", "Community", "Data-Driven"], required: true },
    { key: "champion", label: "Lead / Champion", type: "text" },
    { key: "deadline", label: "Target Completion", type: "date" },
    { key: "progress", label: "Progress %", type: "number" },
];

export default function Page() {
    return (
        <GenericModule
            title="Strategic Planning"
            collectionPath="strategic_plans"
            fields={fields}
            role="admin"
        />
    );
}
