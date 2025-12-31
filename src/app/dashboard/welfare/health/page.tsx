"use client";
import GenericModule, { FieldConfig } from "@/components/GenericModule";

const fields: FieldConfig[] = [
    { key: "appointmentDate", label: "Preferred Date", type: "date", required: true },
    { key: "timeSlot", label: "Time Slot", type: "select", options: ["Morning (8-12)", "Afternoon (1-4)"], required: true },
    { key: "serviceType", label: "Service Required", type: "select", options: ["Medical Officer", "Dental Surgery", "Counseling"], required: true },
    { key: "symptoms", label: "Reason / Symptoms", type: "text" },
    { key: "status", label: "Booking Status", type: "select", options: ["Scheduled", "Completed", "Cancelled"] },
];

export default function Page() {
    return (
        <GenericModule
            title="Health Centre Booking"
            collectionPath="welfare_health"
            fields={fields}
            role="student"
            filterByUser={true}
        />
    );
}
