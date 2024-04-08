// function Dashboard() {
//     return (
//         <div class="h-screen">
//             <div class="flex flex-col min-h-screen bg-gray-50">
//                 {/* Header */}
//                 <header class="bg-white shadow-md py-4 px-4 flex justify-between items-center">
//                     <h1 class="text-xl font-bold">Advertiser Admin</h1>
//                     <button class="inline-flex items-center px-4 py-2 bg-teal-500 hover:bg-teal-700 text-white font-bold rounded shadow-md">
//                         New Campaign
//                     </button>
//                 </header>

//                 {/* Main Content */}
//                 <main class="flex-grow p-4">
//                     <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {/* Performance Overview */}
//                         <div class="bg-white shadow-md rounded-lg p-6">
//                             <h3 class="text-lg font-bold mb-4">Performance Overview</h3>
//                             <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div class="bg-gray-200 rounded-lg p-4">
//                                     <p class="text-xl font-bold text-teal-500">1,234</p>
//                                     <p class="text-sm">Impressions</p>
//                                 </div>
//                                 <div class="bg-gray-200 rounded-lg p-4">
//                                     <p class="text-xl font-bold text-teal-500">567</p>
//                                     <p class="text-sm">Clicks</p>
//                                 </div>
//                                 <div class="bg-gray-200 rounded-lg p-4">
//                                     <p class="text-xl font-bold text-teal-500">34.5%</p>
//                                     <p class="text-sm">Click-Through Rate (CTR)</p>
//                                 </div>
//                                 <div class="bg-gray-200 rounded-lg p-4">
//                                     <p class="text-xl font-bold text-teal-500">$1,234.56</p>
//                                     <p class="text-sm">Total Revenue</p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Recent Campaigns */}
//                         <div class="bg-white shadow-md rounded-lg p-6">
//                             <h3 class="text-lg font-bold mb-4">Recent Campaigns</h3>
//                             <ul class="list-disc space-y-2">
//                                 <li>
//                                     <a href="#" class="text-teal-500">Campaign Name 1</a> - <span class="text-gray-500">Running</span>
//                                 </li>
//                                 <li>
//                                     <a href="#" class="text-teal-500">Campaign Name 2</a> - <span class="text-gray-500">Paused</span>
//                                 </li>
//                                 <li>
//                                     <a href="#" class="text-teal-500">Campaign Name 3</a> - <span class="text-gray-500">Completed</span>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </main>
//             </div>
//         </div>
//     )
// }
import { createSignal, createEffect } from "solid-js";


function Dashboard() {
    const [userData, setUserData] = createSignal({});
    const [campaigns, setCampaigns] = createSignal([]);
    const [earnings, setEarnings] = createSignal(0);
    const [isLoading, setIsLoading] = createSignal(false);

    // Fetch user data, campaigns, and earnings on component mount
    createEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [userResponse, campaignsResponse, earningsResponse] = await Promise.all([
                    fetch("/api/promoter/user"),
                    // fetch("/api/promoter/campaigns"),
                    // fetch("/api/promoter/earnings")
                ]);

                if (!userResponse.ok || !campaignsResponse.ok || !earningsResponse.ok) {
                    throw new Error("Failed to fetch data");
                }

                const [userData, campaigns, earningsData] = await Promise.all([
                    userResponse.json(),
                    // campaignsResponse.json(),
                    // earningsResponse.json()
                ]);

                setUserData(userData);
                setCampaigns(campaigns);
                setEarnings(earningsData.totalEarnings);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div class="flex flex-col min-h-screen bg-gray-100">
            <header class="bg-white shadow-md py-4 px-4 flex justify-between items-center">
                <h1 class="text-xl font-bold">Welcome, {userData.fullName}</h1>
                <button class="px-4 py-2 bg-teal-500 hover:bg-teal-700 text-white rounded-lg">
                    Logout
                </button>
            </header>
            <main class="flex flex-grow px-4 py-8">
                <div class="w-full px-4 py-4 bg-white shadow-md rounded-lg mb-4">
                    <h2 class="text-lg font-bold mb-2">Your Performance</h2>
                    <div class="flex items-center space-x-4">
                        <p class="text-2xl font-semibold text-gray-800">
                            {/* {earnings.toFixed(2)} */}
                        </p>
                        <p class="text-gray-500">Total Earnings</p>
                    </div>
                </div>
                <div class="w-full overflow-x-auto rounded-lg shadow-md">
                    <table class="w-full min-w-full text-left overflow-hidden">
                        <thead>
                            <tr class="bg-gray-50 border-b border-gray-200">
                                <th class="text-xs font-medium text-gray-500 px-4 py-2 w-48">Campaign Name</th>
                                <th class="text-xs font-medium text-gray-500 px-4 py-2 w-48">Status</th>
                                <th class="text-xs font-medium text-gray-500 px-4 py-2">Earnings</th>
                                <th class="text-xs font-medium text-gray-500 px-4 py-2 w-24">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr class="bg-white border-b">
                                    <td colspan="4" class="text-center text-gray-500 p-4">
                                        Loading campaigns...
                                    </td>
                                </tr>
                            ) : campaigns.length === 0 ? (
                                <tr class="bg-white border-b">
                                    <td colspan="4" class="text-center text-gray-500 p-4">
                                        No active campaigns found.
                                    </td>
                                </tr>
                            ) : (
                                campaigns.map((campaign) => (
                                    <tr key={campaign.id} class="bg-white border-b">
                                        <td class="text-sm px-4 py-4">{campaign.name}</td>
                                        <td class="text-sm px-4 py-4">{campaign.status}</td>
                                        <td class="text-sm px-4 py-4">{campaign.earnings.toFixed(2)}</td>
                                        <td class="text-sm px-4 py-4">
                                            <button class="text-teal-500 hover:underline">View Details</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

// export default PromoterDashboard;


export default Dashboard;