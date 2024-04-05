function Dashboard() {
    return (
        <div class="h-screen">
            <div class="flex flex-col min-h-screen bg-gray-50">
                {/* Header */}
                <header class="bg-white shadow-md py-4 px-4 flex justify-between items-center">
                    <h1 class="text-xl font-bold">Advertiser Admin</h1>
                    <button class="inline-flex items-center px-4 py-2 bg-teal-500 hover:bg-teal-700 text-white font-bold rounded shadow-md">
                        New Campaign
                    </button>
                </header>

                {/* Main Content */}
                <main class="flex-grow p-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Performance Overview */}
                        <div class="bg-white shadow-md rounded-lg p-6">
                            <h3 class="text-lg font-bold mb-4">Performance Overview</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="bg-gray-200 rounded-lg p-4">
                                    <p class="text-xl font-bold text-teal-500">1,234</p>
                                    <p class="text-sm">Impressions</p>
                                </div>
                                <div class="bg-gray-200 rounded-lg p-4">
                                    <p class="text-xl font-bold text-teal-500">567</p>
                                    <p class="text-sm">Clicks</p>
                                </div>
                                <div class="bg-gray-200 rounded-lg p-4">
                                    <p class="text-xl font-bold text-teal-500">34.5%</p>
                                    <p class="text-sm">Click-Through Rate (CTR)</p>
                                </div>
                                <div class="bg-gray-200 rounded-lg p-4">
                                    <p class="text-xl font-bold text-teal-500">$1,234.56</p>
                                    <p class="text-sm">Total Revenue</p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Campaigns */}
                        <div class="bg-white shadow-md rounded-lg p-6">
                            <h3 class="text-lg font-bold mb-4">Recent Campaigns</h3>
                            <ul class="list-disc space-y-2">
                                <li>
                                    <a href="#" class="text-teal-500">Campaign Name 1</a> - <span class="text-gray-500">Running</span>
                                </li>
                                <li>
                                    <a href="#" class="text-teal-500">Campaign Name 2</a> - <span class="text-gray-500">Paused</span>
                                </li>
                                <li>
                                    <a href="#" class="text-teal-500">Campaign Name 3</a> - <span class="text-gray-500">Completed</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard;