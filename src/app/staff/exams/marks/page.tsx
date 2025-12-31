"use client";
import GenericModule, { FieldConfig } from "@/components/GenericModule";

const fields: FieldConfig[] = [
    { key: "courseCode", label: "Course Code", type: "text", required: true },
    { key: "studentId", label: "Student Reg No", type: "text", required: true },
    { key: "mark", label: "Mark Obtained", type: "number", required: true },
    { key: "assessmentType", label: "Assessment Type", type: "select", options: ["Assignment 1", "Assignment 2", "Mid-Semester", "End-Semester"], required: true },
    { key: "comments", label: "Comments", type: "text" },
];

export default function Page() {
    return (
        <GenericModule
            title="Assessment Marks Entry"
            collectionPath="staff_marks"
            fields={fields}
            role="staff"
        />
    );
}
