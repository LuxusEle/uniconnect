"use client";
import GenericModule, { FieldConfig } from "@/components/GenericModule";

const fields: FieldConfig[] = [
    { key: "fundName", label: "Fund Name", type: "text", required: true },
    { key: "source", label: "Source of Funds", type: "text" },
    { key: "allocation", label: "Current Balance (LKR)", type: "number", required: true },
    { key: "managedBy", label: "Managed By", type: "text" },
    { key: "status", label: "Status", type: "select", options: ["Active", "Frozen", "Depleted"] },
];

export default function Page() {
    return (
        <GenericModule
            title="University Funds Management"
            collectionPath="finance_funds"
            fields={fields}
            role="admin"
        />
    );
}
