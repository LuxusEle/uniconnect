import MaterialCard from "@/components/MaterialCard";

export default function BursarDashboard() {
    return (
        <div className="space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Finance Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400">Cash flow monitoring and fee management.</p>
            </header>

            <div className="mt-8">
                <MaterialCard
                    title="Revenue"
                    subTitle="Year to Date"
                    icon={<span className="text-xl">💰</span>}
                    color="from-green-600 to-green-400"
                >
                    <p className="text-5xl font-bold text-center text-gray-800 dark:text-white py-8">LKR 45,200,000</p>
                </MaterialCard>
            </div>
        </div>
    );
}
