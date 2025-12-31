"use client";
import GenericModule, { FieldConfig } from "@/components/GenericModule";

const fields: FieldConfig[] = [
    { key: "assetId", label: "Asset ID / Tag", type: "text", required: true },
    { key: "itemName", label: "Item Name", type: "text", required: true },
    { key: "category", label: "Category", type: "select", options: ["Furniture", "Lab Equipment", "IT Hardware", "Vehicle", "Building"], required: true },
    { key: "value", label: "Value (LKR)", type: "number", required: true },
    { key: "location", label: "Location / Dept", type: "text" },
    { key: "acquiredDate", label: "Acquisition Date", type: "date" },
    { key: "condition", label: "Condition", type: "select", options: ["Good", "Repair Needed", "Disposed"] },
];

export default function Page() {
    return (
        <GenericModule
            title="Fixed Assets Register"
            collectionPath="finance_assets"
            fields={fields}
            role="admin"
        />
    );
}
