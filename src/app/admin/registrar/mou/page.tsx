"use client";
import GenericModule, { FieldConfig } from "@/components/GenericModule";

const fields: FieldConfig[] = [
    { key: "partner", label: "Partner University / Org", type: "text", required: true },
    { key: "country", label: "Country", type: "text", required: true },
    { key: "scope", label: "Scope of Collaboration", type: "select", options: ["Student Exchange", "Joint Research", "Staff Training", "Dual Degree"] },
    { key: "signedDate", label: "Signed Date", type: "date" },
    { key: "validUntil", label: "Valid Until", type: "date" },
    { key: "status", label: "Status", type: "select", options: ["Active", "Expiring Soon", "Expired", "Draft"] },
];

export default function Page() {
    return (
        <GenericModule
            title="International MoUs"
            collectionPath="registrar_mous"
            fields={fields}
            role="admin"
        />
    );
}
