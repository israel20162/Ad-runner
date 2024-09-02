import { createStore } from "solid-js/store";
import { useUserContext } from "../../../store/userContext";
import { createSignal,createEffect } from "solid-js";
import { BsWallet2 } from 'solid-icons/bs';
function Dashboard() {
    const [userData, setUserData] = createStore({});
    const [campaigns, setCampaigns] = createSignal([]);
    const [state] = useUserContext();

    const [isLoading, setIsLoading] = createSignal(false);
    const [searchQuery, setSearchQuery] = createSignal("");
    const [activeCampaigns, setActiveCampaigns] = createSignal([]);
    createEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            // Replace with your API call to fetch user data and campaigns
            const response = await fetch(`http://localhost:5000/api/promoter/promoters/${state.user?.id}`);
            const data = await response.json();

            setUserData(data);
            console.log(data);

            setCampaigns(data.campaigns);
            setIsLoading(false);
        };

        fetchData();
    }, []);
    return (
        <>
            <div class="flex flex-col md:flex-row md:justify-between md:items-center w-full mb-4  p-4 gap-4 md:gap-0 ">
                <h2 class="md:text-2xl font-semibold ">Welcome, <span class="text-teal-500">{userData.username}</span> </h2>
                <div class="bg-gray-100 md:w-1/3 md:mr-4 md:p-4 py-4  rounded-lg md:shadow-md md:ml-auto">

                    <div class="flex items-center">
                        <BsWallet2 class="w-7 h-7 mr-2 fill-current text-teal-900" />
                        <span class="text-gray-700 font-medium">Account Balance:</span> <span class="text-teal-500 font-bold ml-2">$0.00</span>
                    </div>
                </div>
            </div>
            <section class="flex md:flex-row flex-col space-x-4">
                <div class="bg-gry-100 max-w-screen rounded-lg shadow-md mb-4 p-4">
                    <h2 class="text-lg font-bold mb-2">Active Campaigns</h2>
                    <table class="w-full text-left overflow-hidden">
                        <thead>
                            <tr class="bg-gray-50 border-b border-gray-200">
                                <th class="text-xs font-medium text-gray-500 px-4 py-2 w-48">
                                    Campaign Name
                                </th>
                                <th class="text-xs font-medium text-gray-500 px-4 py-2 w-48">
                                    Status
                                </th>
                                <th class="text-xs font-medium text-gray-500 px-4 py-2">
                                    Earnings (Est.)
                                </th>
                                <th class="text-xs font-medium text-gray-500 px-4 py-2 w-24">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeCampaigns.length === 0 ? (
                                <tr class="bg-white border-b">
                                    <td colspan="4" class="text-center text-gray-500 p-4">
                                        No active campaigns found.
                                    </td>
                                </tr>
                            ) : (
                                activeCampaigns.map((campaign) => (
                                    <tr key={campaign.id} class="bg-white border-b">
                                        <td class="text-sm px-4 py-4">{campaign.name}</td>
                                        <td class="text-sm px-4 py-4">
                                            {/* Display campaign status (e.g., Active, Running) */}
                                            {campaign.status}
                                        </td>
                                        <td class="text-sm px-4 py-4">${campaign.estimatedEarnings}</td>
                                        <td class="text-sm px-4 py-4">
                                            <button
                                                class="text-teal-500 hover:text-teal-700 underline"
                                                onClick={() => handleViewDetails(campaign.id)}
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div class="bg-gry-100 max-w-screen rounded-lg shadow-md mb-4 p-4">
                    <h2 class="text-lg font-bold mb-2">Previous Campaigns</h2>
                    <table class="w-full text-left overflow-hidden">
                        <thead>
                            <tr class="bg-gray-50 border-b border-gray-200">
                                <th class="text-xs font-medium text-gray-500 px-4 py-2 w-48">
                                    Campaign Name
                                </th>
                                <th class="text-xs font-medium text-gray-500 px-4 py-2 w-48">
                                    Status
                                </th>
                                <th class="text-xs font-medium text-gray-500 px-4 py-2">
                                    Earnings (Est.)
                                </th>
                                <th class="text-xs font-medium text-gray-500 px-4 py-2 w-24">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeCampaigns.length === 0 ? (
                                <tr class="bg-white border-b">
                                    <td colspan="4" class="text-center text-gray-500 p-4">
                                        No active campaigns found.
                                    </td>
                                </tr>
                            ) : (
                                activeCampaigns.map((campaign) => (
                                    <tr key={campaign.id} class="bg-white border-b">
                                        <td class="text-sm px-4 py-4">{campaign.name}</td>
                                        <td class="text-sm px-4 py-4">
                                            {/* Display campaign status (e.g., Active, Running) */}
                                            {campaign.status}
                                        </td>
                                        <td class="text-sm px-4 py-4">${campaign.estimatedEarnings}</td>
                                        <td class="text-sm px-4 py-4">
                                            <button
                                                class="text-teal-500 hover:text-teal-700 underline"
                                                onClick={() => handleViewDetails(campaign.id)}
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}

export default Dashboard;