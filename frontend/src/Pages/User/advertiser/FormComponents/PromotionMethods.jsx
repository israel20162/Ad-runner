export const PromotionMethods = (props) => {

    const promotionMethods = ['Facebook', 'X (Twitter)', 'Instagram', 'TikTok', 'Whatsapp', 'Blog', 'All']

    const handleMethodChange = (e) => {
        const method = e.target.value;
        const updatedMethods = props.selectedMethods;
        if (updatedMethods.includes(method)) {
            updatedMethods.splice(updatedMethods.indexOf(method), 1);
        } else {
            updatedMethods.push(method);
        }
        props.setSelectedMethods(updatedMethods);
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
                                checked={props.selectedMethods.includes(method)}
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
