import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import Tooltip from "../../../components/tooltip";
function CampaignForm() {
    const [name] = createSignal("");
    const [startDate] = createSignal(null);
    const [endDate] = createSignal(null);
    const [budget] = createSignal(0);
    const [imageUrl] = createSignal("");
    const [isNoLimit, setIsNoLimit] = createSignal(true);
    const [promoterLimit, setPromoterLimit] = createSignal(0);
    const [selectedMethods, setSelectedMethods] = createSignal([]);
    const [selectedMetrics, setSelectedMetrics] = createSignal([]);
    const [audience, setAudience] = createSignal([]);

    // const [targetAudience] = createStore(""); // Replace with your audience selection mechanism
    const [description] = createSignal("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form validation and submission logic (replace with your implementation)
        console.log("Campaign submitted:", {
            name: name(),
            startDate: startDate(),
            endDate: endDate(),
            budget: budget(),
            imageUrl: imageUrl(),
            targetAudience: audience(),
            description: description(),
        });
    };
    const PromotionMethods = () => {

        const promotionMethods = ['Facebook', 'X (Twitter)', 'Instagram', 'TikTok', 'Whatsapp', 'Blog']

        const handleMethodChange = (e) => {
            const method = e.target.value;
            const updatedMethods = selectedMethods();
            if (updatedMethods.includes(method)) {
                updatedMethods.splice(updatedMethods.indexOf(method), 1);
            } else {
                updatedMethods.push(method);
            }
            setSelectedMethods(updatedMethods);
        };

        return (
            <div>
             
                <div class="grid grid-cols-2">
                    <For each={promotionMethods} fallback={<div>Loading...</div>}>
                        {(method) => (
                            <label class="inline-flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    value={method}
                                    onChange={handleMethodChange}
                                    checked={selectedMethods().includes(method)}
                                    class="form-checkbox h-5 w-5 text-teal-500"
                                />
                                <span class="ml-2">{method}</span>
                            </label>)}

                    </For>

                </div>

                {/* Add more social media platforms as needed */}
            </div>
        );
    };
    const TargetAudience = () => {

        const targetAudiences = ["Male", "Female", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"];

        const handleCheckboxChange = (e) => {
            const value = e.target.value;
            const updatedAudience = audience();
            if (updatedAudience.includes(value)) {
                updatedAudience.splice(updatedAudience.indexOf(value), 1);
            } else {
                updatedAudience.push(value);
            }
            setAudience(updatedAudience);
        };

        return (
            <div>
              
                <div className="grid grid-cols-2">
                    <For each={targetAudiences} fallback={<div>Loading...</div>}>
                        {(option) => (
                            <label class="inline-flex items-center mb-2" key={option}>
                                <input
                                    type="checkbox"
                                    value={option}
                                    checked={audience().includes(option)}
                                    onChange={handleCheckboxChange}
                                    class="form-checkbox h-5 w-5 text-teal-500"
                                />
                                <span class="ml-2">{option}</span>
                            </label>
                        )}
                    </For>

                </div>

            </div>
        );
    };

    const metrics = ['impressions', 'clicks', 'conversions', 'views', 'likes']
    const BiddingSection = (props) => {
        const [selectedMetric, setSelectedMetric] = createSignal(props.metrics[0].value); // Select first option by default
        const [bidAmount, setBidAmount] = createSignal(0);

        const handleSubmit = (e) => {
            e.preventDefault();
            props.onSubmit({ metric: selectedMetric(), bid: bidAmount() });
        };

        return (
            <div class=" shado rounded  py-6 mb-8">
                <h3 class="text-base font-medium mb-4">Bidding</h3>
                <form onsubmit={handleSubmit}>
                    <div class="mb-4">
                        <label for="metric" class="block text-sm font-medium text-gray-700 mb-2">
                            Bidding Metric
                        </label>
                        <select
                            id="metric"
                            class="block w-full rounded-md shadow-sm border border-gray-300 px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={selectedMetric()}
                            onChange={(e) => setSelectedMetric(e.target.value)}
                        >
                            {props.metrics.map((option) => (
                                <option class="capitalize" key={option.value} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div class="mb-4">
                        <label for="bidAmount" class="block text-sm font-medium text-gray-700 mb-2">
                            Bid Amount ($ per {selectedMetric()})
                        </label>
                        <input
                            type="number"
                            id="bidAmount"
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full sm:text-sm px-3 py-2 border border-gray-300"
                            value={bidAmount()}
                            onInput={(e) => setBidAmount(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        class="inline-flex items-center px-4 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm font-medium bg-indigo-500 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Set Bidding
                    </button>
                </form>
            </div>
        );
    }



    return (
        <form class=" dow-md rounded px-8 pb-8 mt-4" onSubmit={handleSubmit}>
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
                    onInput={(e) => name(e.target.value)}
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
                        onInput={(e) => startDate(e.target.value)}
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
                        onInput={(e) => endDate(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div class="mb-4">
                <label for="budget" class="block text-sm font-medium text-gray-700 mb-2">
                    Budget
                </label>
                <input
                    type="number"
                    id="budget"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full sm:text-sm px-3 py-2 border border-gray-300"
                    value={budget()}
                    onInput={(e) => budget(e.target.value)}
                    required
                />
            </div>
            <div class="mb-4">
                <label for="imageUrl" class="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Image URL
                </label>
                <input
                    type="url"
                    id="imageUrl"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full sm:text-sm px-3 py-2 border border-gray-300"
                    value={imageUrl()}
                    onInput={(e) => imageUrl(e.target.value)}
                />
            </div>
            <div class="mb-4">
                <label for="targetAudience" class="block text-sm font-medium text-gray-700 mb-2">
                    Promotion Methods
                </label>
                <PromotionMethods />
            </div>
            <div class="mb-4">
                <label for="targetAudience" class="block text-sm font-medium text-gray-700 mb-2">
                    Target Audience
                </label>
                <TargetAudience />
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
                    onInput={(e) => description(e.target.value)}
                    rows="6"
                    required
                ></textarea>
            </div>
            <div className="mb-4">


                <BiddingSection onSubmit={setSelectedMetrics} metrics={metrics} />

            </div>
            <div class="flex items-center justify-end">
                <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                    Create Campaign
                </button>
            </div>
        </form>
    );
}

export default CampaignForm;

