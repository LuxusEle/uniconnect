"use client";
import GenericModule, { FieldConfig } from "@/components/GenericModule";

const fields: FieldConfig[] = [
    { key: "academicYear", label: "Academic Year", type: "text", required: true },
    { key: "annualIncome", label: "Annual Family Income (LKR)", type: "number", required: true },
    { key: "distance", label: "Distance from Home (km)", type: "number", required: true },
    { key: "gsDivision", label: "GS Division", type: "text" },
    { key: "status", label: "Application Status", type: "select", options: ["Submitted", "Under Review", "Approved", "Rejected"] },
];

export default function Page() {
    return (
        <GenericModule
            title="Bursary Applications"
            collectionPath="financial_bursary"
            fields={fields}
            role="student"
            filterByUser={true}
        />
    );
}
