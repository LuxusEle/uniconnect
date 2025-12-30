import MaterialCard from "@/components/MaterialCard";

export default function StudentDashboard() {
    return (
        <div className="space-y-6">
            <header className="mb-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome, Student</h1>
                <p className="text-gray-500">Academic Year 2023/2024 • Physical Science</p>
            </header>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="mt-8">
                    <MaterialCard
                        title="Active"
                        subTitle="Semester Registration"
                        icon={<span className="text-xl">✓</span>}
                        color="from-green-600 to-green-400"
                    >
                        <p className="text-xs text-green-600 font-bold mt-2">+ Valid until Dec 31</p>
                    </MaterialCard>
                </div>

                <div className="mt-8">
                    <MaterialCard
                        title="3.45"
                        subTitle="Overall GPA"
                        icon={<span className="text-xl">A</span>}
                        color="from-blue-600 to-blue-400"
                    >
                        <p className="text-xs text-gray-400 font-bold mt-2">Class of 2024</p>
                    </MaterialCard>
                </div>

                <div className="mt-8">
                    <MaterialCard
                        title="LKR 2,500"
                        subTitle="Due Amount"
                        icon={<span className="text-xl">$</span>}
                        color="from-red-600 to-red-400"
                    >
                        <button className="text-xs font-bold text-red-500 mt-2 hover:underline">PAY NOW &rarr;</button>
                    </MaterialCard>
                </div>
            </div>

            {/* Notifications / Announcements */}
            <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-900/30">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">📢 Important Notice</h3>
                <p className="text-sm text-blue-700 dark:text-blue-200/80">
                    Exam registration for Semester 2 closes on Friday. Please ensure all payments are settled before the deadline.
                </p>
            </div>
        </div>
    );
}
