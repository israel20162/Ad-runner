export const TargetAudience = (props) => {

    const targetAudiences = ["Male", "Female", "18-24", "25-34", "35-44", "45-54", "55-64", "65+", "All"];

    const handleCheckboxChange = (e) => {
        const value = e.target.value;
        const updatedAudience = props.audience;
        if (updatedAudience.includes(value)) {
            updatedAudience.splice(updatedAudience.indexOf(value), 1);
        } else {
            updatedAudience.push(value);
        }
        props.setAudience(updatedAudience);
    };

    return (
        <div>

            <div class="grid grid-cols-2">
                <For each={targetAudiences} fallback={<div>Loading...</div>}>
                    {(option) => (
                        <label class="inline-flex items-center mb-2" key={option}>
                            <input
                                type="checkbox"
                                value={option}
                                checked={props.audience.includes(option)}
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