
import React from 'react';
import MaterialCard from "@/components/MaterialCard";

const PageStub = ({ title, role }: { title: string, role: string }) => {
    let color = "from-blue-600 to-blue-400";
    if (role === 'staff') color = "from-amber-600 to-amber-400";
    if (role === 'admin') color = "from-red-600 to-red-400";

    return (
        <div className="space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{title}</h1>
                <p className="text-gray-500">Module under construction - UMS Blueprint Phase 6</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <MaterialCard title="Status" subTitle="Module Readiness" icon={<span className="text-xl">🚧</span>} color={color}>
                    <p className="text-gray-600 dark:text-gray-300 py-4">
                        This module is currently being implemented. <br />
                        <b>Feature:</b> {title}
                    </p>
                </MaterialCard>
            </div>
        </div>
    );
};

export default PageStub;
