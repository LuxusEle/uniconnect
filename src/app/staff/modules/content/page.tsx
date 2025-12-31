"use client";
import GenericModule, { FieldConfig } from "@/components/GenericModule";

const fields: FieldConfig[] = [
    { key: "courseCode", label: "Course Code", type: "text", required: true },
    { key: "title", label: "Material Title", type: "text", required: true },
    { key: "type", label: "Type", type: "select", options: ["Lecture Note", "Assignment", "Reading", "Video"], required: true },
    { key: "link", label: "File Link / URL", type: "text" },
    { key: "status", label: "Visibility", type: "select", options: ["Published", "Draft"] },
];

export default function Page() {
    return (
        <GenericModule
            title="Course Content Management"
            collectionPath="staff_content"
            fields={fields}
            role="staff"
            filterByUser={true}
        />
    );
}
