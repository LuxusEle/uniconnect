"use client";
import GenericModule, { FieldConfig } from "@/components/GenericModule";

const fields: FieldConfig[] = [
    { key: "semester", label: "Semester", type: "select", options: ["Semester 1", "Semester 2"], required: true },
    { key: "courseCode", label: "Course Code", type: "text", required: true },
    { key: "courseTitle", label: "Course Title", type: "text", required: true },
    { key: "credits", label: "Credits", type: "number", required: true },
    { key: "type", label: "Type", type: "select", options: ["Core", "Optional", "Auxiliary"], required: true },
    { key: "status", label: "Registration Status", type: "select", options: ["Pending Approval", "Registered"] },
];

export default function Page() {
    return (
        <GenericModule
            title="Course Registration"
            collectionPath="academic_registration"
            fields={fields}
            role="student"
            filterByUser={true}
        />
    );
}
