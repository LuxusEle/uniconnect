"use client";
import GenericModule, { FieldConfig } from "@/components/GenericModule";

const fields: FieldConfig[] = [
    { key: "auditRef", label: "Audit Reference", type: "text", required: true },
    { key: "department", label: "Target Department", type: "text", required: true },
    { key: "auditType", label: "Audit Type", type: "select", options: ["Financial", "Operational", "Compliance", "IT"] },
    { key: "finding", label: "Key Finding", type: "text" },
    { key: "risk", label: "Risk Level", type: "select", options: ["High", "Medium", "Low"], required: true },
    { key: "status", label: "Resolution Status", type: "select", options: ["Open", "In Process", "Resolved"] },
];

export default function Page() {
    return (
        <GenericModule
            title="Internal Audit Management"
            collectionPath="finance_audit"
            fields={fields}
            role="admin"
        />
    );
}
