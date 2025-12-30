export default function ProfilePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold dark:text-white">My Profile</h1>
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold">
                        ST
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Student Name</h2>
                        <p className="text-gray-500">student@university.lk</p>
                    </div>
                </div>
                {/* Form fields would go here */}
            </div>
        </div>
    )
}
