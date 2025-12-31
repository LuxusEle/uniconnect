"use client";
import GenericModule, { FieldConfig } from "@/components/GenericModule";

const fields: FieldConfig[] = [
    { key: "academicYear", label: "Academic Year", type: "text", required: true },
    { key: "distance", label: "Distance (km)", type: "number", required: true }, // Priority > 25km
    { key: "gender", label: "Gender", type: "select", options: ["Male", "Female"], required: true },
    { key: "preferredHostel", label: "Preferred Hostel", type: "select", options: ["Hostel A (In-campus)", "Hostel B (External)", "No Preference"] },
    { key: "status", label: "Allocation Status", type: "select", options: ["Applied", "Waitlisted", "Allocated", "Rejected"] },
];

export default function Page() {
    return (
        <GenericModule
            title="Hostel Accommodation"
            collectionPath="welfare_hostel"
            fields={fields}
            role="student"
            filterByUser={true}
        />
    );
}
