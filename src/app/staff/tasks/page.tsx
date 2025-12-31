"use client";
import GenericModule, { FieldConfig } from "@/components/GenericModule";

const fields: FieldConfig[] = [
    { key: "taskName", label: "Task Description", type: "text", required: true },
    { key: "priority", label: "Priority", type: "select", options: ["High", "Normal", "Low"] },
    { key: "dueDate", label: "Due Date", type: "date" },
    { key: "status", label: "Status", type: "select", options: ["To Do", "In Progress", "Done"] },
];

export default function Page() {
    return (
        <GenericModule
            title="My Tasks"
            collectionPath="staff_tasks"
            fields={fields}
            role="staff"
            filterByUser={true}
        />
    );
}
