"use client";
import GenericModule, { FieldConfig } from "@/components/GenericModule";

const fields: FieldConfig[] = [
    { key: "title", label: "Publication Title", type: "text", required: true },
    { key: "journal", label: "Journal / Conference", type: "text", required: true },
    { key: "year", label: "Year", type: "number", required: true },
    { key: "link", label: "DOI / Link", type: "text" },
    { key: "citationIdx", label: "Citation Index", type: "select", options: ["SCI", "Scopus", "Other"] },
];

export default function Page() {
    return (
        <GenericModule
            title="Research Publications"
            collectionPath="staff_publications"
            fields={fields}
            role="staff"
            filterByUser={true}
        />
    );
}
