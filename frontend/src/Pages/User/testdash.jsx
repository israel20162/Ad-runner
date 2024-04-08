import { createSignal, createEffect } from "solid-js";

function PromoterDashboard2() {
    const [userData, setUserData] = createSignal({});
    const [activeCampaigns, setActiveCampaigns] = createSignal([]);
    const [completedCampaigns, setCompletedCampaigns] = createSignal([]);
    const [earnings, setEarnings] = createSignal(0);
    const [isLoading, setIsLoading] = createSignal(false);

    // Fetch user data, campaigns (separated by active/completed), and earnings on component mount
    createEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            // Replace with your API calls to fetch data
            const userResponse = await fetch("/api/promoter/user");
            const userData = await userResponse.json();
            setUserData(userData);

            const campaignsResponse = await fetch("/api/promoter/campaigns");
            const campaigns = await campaignsResponse.json();

            const activeCampaigns = campaigns.filter((c) => c.status === "Active");
            const completedCampaigns = campaigns.filter((c) => c.status === "Completed");

            setActiveCampaigns(activeCampaigns);
            setCompletedCampaigns(completedCampaigns);

            const earningsResponse = await fetch("/api/promoter/earnings");
            const earningsData = await earningsResponse.json();
            setEarnings(earningsData.totalEarnings);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const handleViewDetails = (campaignId) => {
        // Handle click event for viewing campaign details, potentially redirecting to a specific campaign details page
        console.log("View Details clicked for campaign:", campaignId);
    };

    return (
        <div class="flex flex-col min-h-screen bg-gray-100">
            <header class="bg-white shadow-md py-4 px-4 flex justify-between items-center">
                <h1 class="text-xl font-bold">Welcome, {userData.fullName}</h1>
                <button class="px-4 py-2 bg-teal-500 hover:bg-teal-700 text-white rounded-lg">
                    Logout
                </button>
            </header>
            <main class="flex flex-grow px-4 py-8">
                <div class="w-full px-4 py-4 bg-white shadow-md  mb-4">
                    <h2 class="text-lg font-bold mb-2">Your Performance</h2>
                    <div class="flex items-center space-x-4">
                        <p class="text-2xl font-semibold text-gray-800">
                            {/* ${earnings.toFixed(2)} */}
                        </p>
                        <p class="text-gray-500">Total Earnings</p>
                    </div>
                </div>
                <div class="w-full overflow-x-auto rounded-lg shadow-md mb-4">
                    <h2 class="text-lg font-bold px-4 py-2 bg-gray-50 border-b border-gray-200">
                        Active Campaigns
                    </h2>
                    <table class="w-full min-w-full text-left overflow-hidden">
                        <thead>
                            <tr class="bg-gray-50 border-b border-gray-200">
                                <th class="text-xs font-medium text-gray-500 px-4 py-2 w-48">
                                    Campaign Name
                                </th>
                                <th class="text-xs font-medium text-gray-500 px-4 py-2 w-48">
                                    Status
                                </th>
                                <th class="text-xs font-medium text-gray-500 px-4 py-2 w-24">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {isLoading ? (
                                <tr class="bg-white border-b">
                                    <td colspan="3" class="text-center text-gray-500 p-4">
                                        Loading campaigns...
                                    </td>
                                </tr>
                            ) : activeCampaigns.length === 0 ? (
                                <tr class="bg-white border-b">
                                    <td colspan="3" class="text-center text-gray-500 p-4">
                                        No active campaigns found.
                                    </td>
                                </tr>
                            ) : (activeCampaigns.map((campaign) => (
                                <tr key={campaign.id} class="bg-white border-b">
                                    <td class="text-sm px-4 py-4">{campaign.name}</td>
                                    <td class="text-sm px-4 py-4">{campaign.status}</td>
                                    <td class="text-sm px-4 py-4">
                                        <button
                                            class="text-teal-500 hover:underline"
                                            onClick={() => handleViewDetails(campaign.id)}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))
                            )} */}
                        </tbody>
                    </table>
                </div>
                <div class="w-full overflow-x-auto rounded-lg shadow-md">
                    <h2 class="text-lg font-bold px-4 py-2 bg-gray-50 border-b border-gray-200">
                        Completed Campaigns
                    </h2>
                    <table class="w-full min-w-full text-left overflow-hidden">
                        <thead>
                            <tr class="bg-gray-50 border-b border-gray-200">
                                <th class="text-xs font-medium text-gray-500 px-4 py-2 w-48">
                                    Campaign Name
                                </th>
                                <th class="text-xs font-medium text-gray-500 px-4 py-2 w-48">
                                    Status
                                </th>
                                <th class="text-xs font-medium text-gray-500 px-4 py-2 w-24">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {completedCampaigns.map((campaign) => (
                                <tr key={campaign.id} class="bg-white border-b">
                                    <td class="text-sm px-4 py-4">{campaign.name}</td>
                                    <td class="text-sm px-4 py-4">{campaign.status}</td>
                                    <td class="text-sm px-4 py-4">
                                        <button
                                            class="text-teal-500 hover:underline"
                                            onClick={() => handleViewDetails(campaign.id)}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))} */}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default PromoterDashboard2;

