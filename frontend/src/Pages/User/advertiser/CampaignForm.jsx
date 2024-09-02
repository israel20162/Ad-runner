import { createSignal, For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import Tooltip from "../../../components/tooltip";
import ImageUpload from "../../../components/imageupload";
import toast, { Toaster } from 'solid-toast';
import { useUserContext } from "../../../store/userContext";
import { BiddingSection } from "./FormComponents/BiddingSection";
import { CampaignStatus } from "./FormComponents/CampaignStatus";
import { TargetAudience } from "./FormComponents/TargetAudience";
import { PromotionMethods } from "./FormComponents/PromotionMethods";

function CampaignForm() {
    const [state] = useUserContext();
    const [name, setName] = createSignal("");
    const [startDate, setStartDate] = createSignal(null);
    const [endDate, setEndDate] = createSignal(null);
    const [isLoading, setIsLoading] = createSignal(false);
    const [imageUrl, setImageUrl] = createSignal("");
    const [videoUrl, setVideoUrl] = createSignal("");
    const [isNoLimit, setIsNoLimit] = createSignal(true);
    const [promoterLimit, setPromoterLimit] = createSignal(0);
    const [selectedMethods, setSelectedMethods] = createSignal([]);
    const [audience, setAudience] = createSignal([]);
    const [metrics, setMetrics] = createStore(['impressions', 'clicks', 'conversions', 'views', 'likes'])
    const [prices, setPrices] = createStore([])
    const [status, setStatus] = createSignal()
    // const [targetAudience] = createStore(""); // Replace with your audience selection mechanism
    const [description, setDescription] = createSignal("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const formData = {
            'name': name(),
            'startDate': startDate(),
            'endDate': endDate(),
            'imageUrl': imageUrl(),
            'videoUrl': videoUrl(),
            'promotionMethods': selectedMethods(),
            'targetAudience': audience(),
            'description': description(),
            'pricePerMetric': prices,
            'creatorId': state.user?.id,
            'promoterLimit': promoterLimit(),
            'status': status()

        }

        const response = await fetch(`http://localhost:5000/api/advertiser/campaign/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }).finally(() => {
            setIsLoading(false)
        });
        const data = await response.json()

        toast.success(data.message)





    };
    
   

   



    return (
        <form class="  rounded px-8 pb-8 mt-4" onsubmit={handleSubmit} enctype="multipart/form-data">
            <h2 class="text-lg font-bold mb-4">Create New Campaign</h2>
            <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Name
                </label>
                <input
                    type="text"
                    id="name"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full sm:text-sm px-3 py-2 border border-gray-300"
                    value={name()}
                    onInput={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div class="mb-4">
                    <label for="startDate" class="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full sm:text-sm px-3 py-2 border border-gray-300"
                        value={startDate()}
                        onInput={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div class="mb-4">
                    <label for="endDate" class="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full sm:text-sm px-3 py-2 border border-gray-300"
                        value={endDate()}
                        onInput={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div class="mb-4">
                {/* <label for="budget" class="block text-sm font-medium text-gray-700 mb-2">
                    Budget
                </label>
                <input
                    type="number"
                    id="budget"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full sm:text-sm px-3 py-2 border border-gray-300"
                    value={budget()}
                    onInput={(e) => setBudget(e.target.value)}
                    required
                /> */}
            </div>
            <div class="mb-4 flex items-center justify-evenly gap-4">
                <div class="w-1/2"> <label for="imageUrl" class="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Image URL
                </label>
                    <input
                        type="url"
                        id="imageUrl"
                        required
                        class="shadow-sm focus:ring-indigo-500 w-full focus:border-indigo-500 rounded-md sm:text-sm px-3 py-2 border border-gray-300"
                        value={imageUrl()}
                        oninput={(e) => setImageUrl(e.target.value)}
                    /></div>
                <div class="w-1/2">
                    <label for="imageUrl" class="block text-sm font-medium text-gray-700 mb-2">
                        Campaign Image
                    </label>
                    <ImageUpload setImagepath={setImageUrl} />
                </div>

            </div>
            <div class="mb-4">
                <label for="imageUrl" class="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Video URL
                </label>
                <input
                    type="url"
                    id="videoUrl"
                    class="shadow-sm focus:ring-indigo-500 w-full focus:border-indigo-500 rounded-md sm:text-sm px-3 py-2 border border-gray-300"
                    value={videoUrl()}
                    oninput={(e) => setVideoUrl(e.target.value)}
                />
            </div>
            <div class="mb-4">
                <label for="targetAudience" class="block text-sm font-medium text-gray-700 mb-2">
                    Promotion Methods
                </label>
                <PromotionMethods selectedMethods={selectedMethods()} setSelectedMethods={setSelectedMethods} />
            </div>
            <div class="mb-4">
                <label for="targetAudience" class="block text-sm font-medium text-gray-700 mb-2">
                    Target Audience
                </label>
                <TargetAudience audience={audience()} setAudience={setAudience} />
            </div>
            <div class="mb-4">
                <label for="imageUrl" class="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center w-full">
                        Promoter Limit <Tooltip message='Sets a limit for the number of promoters that can take on a campiagn' />
                    </div>
                </label>
                <div class="flex flex-col gap-2">
                    <input
                        type="text"
                        id="no-limit"
                        class="shadow-sm focus:ring-indigo-500 w-2/3 focus:border-indigo-500 rounded-md sm:text-sm px-3 py-2 border border-gray-300"
                        value={promoterLimit()}
                        disabled={isNoLimit()}
                        onInput={(e) => setPromoterLimit(e.target.value)}
                    />
                    <label for="no-limit" class="flex items-center gap-2 w-fit cursor-pointer">

                        <input
                            onclick={() => {
                                setIsNoLimit(prev => !prev)
                                setPromoterLimit(0)
                            }}
                            type="checkbox"
                            checked={true}
                            name="no-limit"
                            id="no-limit"
                            class="" />
                        No Limit
                    </label>
                </div>

            </div>
            <div class="mb-4">
                <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
                    Description
                </label>
                <textarea
                    id="description"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full sm:text-sm px-3 py-2 border border-gray-300"
                    value={description()}
                    onInput={(e) => setDescription(e.target.value)}
                    rows="6"
                    required
                ></textarea>
            </div>
            <div class="mb-4">
                <label for="status" class="flex  text-sm font-medium text-gray-700 mb-2">
                    Status <Tooltip message='Only campaigns with status "Active" will be displayed to promoters' />
                </label>
                <CampaignStatus status={status()} setStatus={setStatus} />
            </div>
            <div class="mb-4">


                <BiddingSection onSubmit={setPrices} metrics={metrics} />
                <Show when={prices.length !== 0}>
                    <div class=" rounded-lg  p-2">
                        {/* <h2 class="text-lg font-semibold mb-4">Metrics and Amounts</h2> */}
                        <div class="overflow-x-auto">
                            <table class="min-w-full capitalize">
                                <thead>
                                    <tr>
                                        <th class="px-4 py-2 text-left">Metric</th>
                                        <th class="px-4 py-2 text-left">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <For each={prices}>
                                        {(price, index) => (
                                            <tr key={index} class="{{ index % 2 === 0 ? 'bg-gray-50' : 'bg-white' }}">
                                                <td class="px-4 py-2">{price.metric}</td>
                                                <td class="px-4 py-2">{price.bid}</td>

                                            </tr>
                                        )}
                                    </For>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </Show>



            </div>
            <div class="flex items-center justify-end">
                <button type="submit" disabled={isLoading()} class="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                    {isLoading() ? <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></path></svg> : " Create Campaign"}
                </button>
            </div>
            <Toaster />
        </form>
    );
}

export default CampaignForm;

