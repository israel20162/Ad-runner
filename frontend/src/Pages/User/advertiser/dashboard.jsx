import { createEffect, createSignal, createResource, Switch, Match, Suspense, For } from "solid-js";
import { useUserContext } from "../../../store/userContext";
import CampaignCard from "../../../components/campaignCard";


export default function Dashboard() {
    const [state] = useUserContext();
    const [advertiser, setAdvertiser] = createSignal([])
 
    const fetchcampaign = async () => {
        const campaigns = await fetch(`http://localhost:5000/api/advertiser/campaign/all`, {

        })
        return campaigns.json()

    }
    const [campaigns] = createResource('', fetchcampaign);
    createEffect(async () => {
        // Fetch data from your backend (replace with your API calls)
        const advertiser = await fetch(`http://localhost:5000/api/advertiser/advertiser/${state.user?.id}`);
        const data = await advertiser.json();  
        setAdvertiser(data)   
    });
    

    // function CampaignRow() {
    //     return (
    //         <tr class="text-gray-700 border-b hover:bg-gray-100">
    //             <td class="px-4 py-2"></td>
    //             <td class="px-4 py-2">{status}</td>
    //             <td class="px-4 py-2">{budget}</td>
    //             <td class="px-4 py-2">{impressions}</td>
    //             <td class="px-4 py-2">{/* Actions */}</td>
    //         </tr>
    //     );
    // }
    return (
        <div class="flex min-h-screen">
            <include src="sidebar.jsx"></include>

            <div class="flex-1 p-8">
                <h2 class="text-xl font-bold mb-6">Welcome ,<span class="text-teal-500">{advertiser().username}</span> </h2>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                    <div class="bg-white shadow-md rounded px-4 py-5">
                        <h3 class="text-base font-medium mb-2">Total Spend</h3>
                        <p class="text-xl font-bold text-gray-800">$<span>{0}</span></p>
                    </div>
                    <div class="bg-white shadow-md rounded px-4 py-5">
                        <h3 class="text-base font-medium mb-2">Impressions</h3>
                        <p class="text-xl font-bold text-gray-800">
                            <span>{0}</span>
                        </p>
                    </div>
                </div>

                <div class="mb-8">
                    <h3 class="text-base font-medium mb-4">Recent Campaigns</h3>
                    <div className="min-h-screen bg-gray-100 p-4 grid grid-cols-2 gap-4">
                        <Suspense fallback={<div>Loading...</div>}>
                            <Switch>
                                <Match when={campaigns.error}>
                                    <span>Error: {campaigns.error.message}</span>
                                </Match>
                                <Match when={campaigns()}>
                                    <For each={campaigns()}>
                                        {campaign => (<CampaignCard {...campaign} />)}
                                    </For>
                                </Match>
                                </Switch>
                     
                       </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}
