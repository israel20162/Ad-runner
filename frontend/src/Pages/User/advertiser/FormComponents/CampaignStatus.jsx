
export const CampaignStatus = (props) => {
    const statuses = ['Draft', 'Active', 'Completed', 'Paused', 'Cancelled']

    return (
        <select
            id="metric"
            class="block w-full capitalize rounded-md shadow-sm border border-gray-300 px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={props.status}
            onchange={(e) => props.setStatus(e.target.value)}
        >
            <For each={statuses}>

                {(option) => (
                    <option class="capitalize" key={option} value={option}>
                        {option}
                    </option>
                )}
            </For>
        </select>
    )
}