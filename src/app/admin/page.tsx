import MaterialCard from "@/components/MaterialCard";

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Admin Overview</h1>
                <p className="text-gray-500 dark:text-gray-400">System health, performance stats, and user management.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="mt-8">
                    <MaterialCard
                        title="1,240"
                        subTitle="Total Students"
                        icon={<span className="text-xl">U</span>}
                        color="from-red-600 to-red-400"
                    >
                        <span className="text-green-500 font-bold text-sm">+5%</span>
                    </MaterialCard>
                </div>

                <div className="mt-8">
                    <MaterialCard
                        title="85"
                        subTitle="Active Staff"
                        icon={<span className="text-xl">S</span>}
                        color="from-orange-600 to-orange-400"
                    >
                        <span className="text-gray-400 font-bold text-sm">--</span>
                    </MaterialCard>
                </div>
            </div>
        </div>
    );
}
