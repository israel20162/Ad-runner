import { createEffect, createSignal } from "solid-js";





export default function Dashboard() {
    const [totalSpend] = createSignal(0);
    const [impressions] = createSignal(0);
    const [recentCampaigns] = createSignal([]);
    createEffect(async () => {
        // Fetch data from your backend (replace with your API calls)
        const response = await fetch('/api/advertiser/dashboard');
        const data = await response.json();

        totalSpend(data.totalSpend.toFixed(2));
        impressions(data.impressions);
        recentCampaigns(data.campaigns);
    });

    function CampaignRow({ name, status, budget, impressions }) {
        return (
            <tr class="text-gray-700 border-b hover:bg-gray-100">
                <td class="px-4 py-2">{name}</td>
                <td class="px-4 py-2">{status}</td>
                <td class="px-4 py-2">{budget}</td>
                <td class="px-4 py-2">{impressions}</td>
                <td class="px-4 py-2">{/* Actions */}</td>
            </tr>
        );
    }
    return (
        <div class="flex min-h-screen">
            <include src="sidebar.jsx"></include>

            <div class="flex-1 p-8">
                <h2 class="text-xl font-bold mb-6">Advertiser Dashboard</h2>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                    <div class="bg-white shadow-md rounded px-4 py-5">
                        <h3 class="text-base font-medium mb-2">Total Spend</h3>
                        <p class="text-xl font-bold text-gray-800">$<span>{totalSpend()}</span></p>
                    </div>
                    <div class="bg-white shadow-md rounded px-4 py-5">
                        <h3 class="text-base font-medium mb-2">Impressions</h3>
                        <p class="text-xl font-bold text-gray-800">
                            <span>{impressions()}</span>
                        </p>
                    </div>
                </div>

                <div class="mb-8">
                    <h3 class="text-base font-medium mb-4">Recent Campaigns</h3>

                </div>
            </div>
        </div>
    );
}
