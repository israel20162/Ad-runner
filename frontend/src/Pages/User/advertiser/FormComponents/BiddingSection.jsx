import { createSignal } from "solid-js"
export const BiddingSection = (props) => {
    const [selectedMetric, setSelectedMetric] = createSignal(props.metrics[0].value); // Select first option by default
    const [bidAmount, setBidAmount] = createSignal(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit((prev) => [...prev, { metric: selectedMetric(), bid: bidAmount() }])
    };

    return (
        <div class="  rounded  py-6 mb-8">
            <h3 class="text-base font-medium mb-4">Bidding</h3>
            <form onsubmit={handleSubmit}>
                <div class="mb-4">
                    <label for="metric" class="block text-sm font-medium text-gray-700 mb-2">
                        Bidding Metric
                    </label>
                    <select
                        id="metric"
                        class="block w-full capitalize rounded-md shadow-sm border border-gray-300 px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={selectedMetric()}
                        onchange={(e) => setSelectedMetric(e.target.value)}
                    >
                        <For each={props.metrics}>

                            {(option) => (
                                <option class="capitalize" key={option.value} value={option}>
                                    {option}
                                </option>
                            )}
                        </For>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="bidAmount" class="block text-sm font-medium text-gray-700 mb-2">
                        Bid Amount (&#8358; per {selectedMetric()})
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