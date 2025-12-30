import MaterialCard from "@/components/MaterialCard";

export default function StaffDashboard() {
    return (
        <div className="space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Staff Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage your lectures, grading, and attendance.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Teaching Schedule Widget */}
                <div className="mt-8">
                    <MaterialCard
                        title="Upcoming Classes"
                        subTitle="Lectures today"
                        icon={<span className="text-xl">📅</span>}
                        color="from-amber-600 to-amber-400"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                <div>
                                    <h4 className="font-bold">CS101 - Intro to CS</h4>
                                    <p className="text-sm text-gray-500">Lecture Hall A</p>
                                </div>
                                <span className="text-sm font-mono text-amber-600">10:00 AM</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                <div>
                                    <h4 className="font-bold">CS202 - Data Structures</h4>
                                    <p className="text-sm text-gray-500">Lab 3</p>
                                </div>
                                <span className="text-sm font-mono text-amber-600">02:00 PM</span>
                            </div>
                        </div>
                    </MaterialCard>
                </div>

                {/* Pending Tasks Widget */}
                <div className="mt-8">
                    <MaterialCard
                        title="Pending Tasks"
                        subTitle="To-do list"
                        icon={<span className="text-xl">📝</span>}
                        color="from-amber-600 to-amber-400"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <span className="text-sm">Submit CS101 Mid-term Grades</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                <span className="text-sm">Approve Student Leave Requests</span>
                            </div>
                        </div>
                    </MaterialCard>
                </div>
            </div>
        </div>
    );
}
