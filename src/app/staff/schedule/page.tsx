"use client";
import GenericModule, { FieldConfig } from "@/components/GenericModule";

const fields: FieldConfig[] = [
    { key: "day", label: "Day of Week", type: "select", options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], required: true },
    { key: "courseCode", label: "Course Code", type: "text", required: true },
    { key: "time", label: "Time Slot", type: "text", required: true },
    { key: "hall", label: "Lecture Hall", type: "text" },
    { key: "batch", label: "Batch", type: "text" },
];

export default function Page() {
    return (
        <GenericModule
            title="Teaching Schedule"
            collectionPath="staff_schedule"
            fields={fields}
            role="staff"
            filterByUser={true}
        />
    );
}
