import { createSignal, createEffect, Show, For } from "solid-js";
import { createStore } from "solid-js/store";
import { useUserContext } from "../../store/userContext";
function Onboarding() {
    const [state] = useUserContext()

    const [userType, setUserType] = createSignal("select");
    const [audience, setAudience] = createSignal([]);
    const [errors, setErrors] = createSignal({});
    const [isLoading, setIsLoading] = createSignal(false);
    const [isSelected, setIsSelected] = createSignal(false)
    const [selectedMethods, setSelectedMethods] = createSignal([]);

    const [formData, setFormData] = createStore({
        userId: state.user?.id,
        username: state.user?.username || '',
        // password: "",
        email: state.user?.email || '',
        // Add other fields as needed (advertiser/promoter)
        fullName: "",
        contactInfo: "",
        bio: "",
        profilePicture: "",
        promotionMethods: selectedMethods(), // Empty array for selected methods
        targetAudience: audience(),
        previousExperience: "",
        promotionLinks: "",
        paymentMethod: "", // Placeholder for payment info
    });


    const handleUserTypeChange = (e) => setUserType(e.target.value);

    
    const handleChange = (e) => {
        setFormData(e.target.name, e.target.value);
    };

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/promoter/promoter-signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to save promoter data');
            }

            const responseData = await response.json();
            console.log('Promoter data saved:', responseData);
        } catch (error) {
            console.error('Error saving promoter data:', error.message);
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Handle successful submission (redirect, etc.)
       
        setIsLoading(false);
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
                <h3 class="text-lg font-bold mb-4">Promotion Methods</h3>
                <div class="grid grid-cols-2">
                    <For each={promotionMethods} fallback={<div>Loading...</div>}>
                        {(method) => (<label class="inline-flex items-center mb-2">
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
                <h3 class="text-lg font-bold mb-4">Target Audience</h3>
                <div className="grid grid-cols-2">
                    {targetAudiences.map((option) => (
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
                    ))}
                </div>

            </div>
        );
    };







    // Form validation example (add more validations as needed)
    createEffect(() => {
        const newErrors = {};
        if (userType === "select") {
            newErrors.userType = "Please select a user type";
        }
        if (!formData.username) {
            newErrors.username = "Username is required";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        }
        // Add validation for other fields based on user type
        setErrors(newErrors);
    }, [userType, formData]);

    return (
        <div class="flex flex-col min-h-screen bg-gray-100">
            <header class="bg-white shadow-md py-4 px-4 flex justify-between items-center">
                <h1 class="text-xl font-bold">Welcome!</h1>
            </header>
            <main class="grid-flow-col grid px-4 py-8">
                <Show when={!isSelected()}>
                    <div class="h-full w-full md:w-1/2 mx-auto relative px-4 pt-8 pb-32 bg-white shadow-md rounded-lg">
                        <h2 class="text-lg font-bold mb-4">Select User Type</h2>
                        <select
                            class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-teal-500 focus:ring-1"
                            value={userType()}
                            onChange={handleUserTypeChange}
                        >
                            <option value="select">Select...</option>
                            <option value="advertiser">Advertiser</option>
                            <option value="promoter">Promoter</option>
                        </select>
                        {errors.userType && <div class="text-red-500 text-sm">{errors.userType}</div>}
                        <button onclick={() => setIsSelected(true)} class="px-4 py-2 absolute bottom-0 right-0 m-8 rounded-md bg-teal-500 text-white">Next</button>
                    </div>
                </Show>

                <Show when={isSelected()}>
                    <div class="md:w-1/2 mx-auto  px-4 py-4 bg-white shadow-md rounded-lg mt-4 md:mt-0">
                        <form class="space-y-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                class="w-full px-3 capitalize py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-teal-500 focus:ring-1"
                                placeholder="Username"
                                required
                                value={formData.username}
                                name="username"
                                onChange={handleChange}
                            />
                            {errors.username && <div class="text-red-500 text-sm">{errors.username}</div>}



                            <input
                                type="email"
                                class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-teal-500 focus:ring-1"
                                placeholder="Email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />

                            {/* Other fields based on user type */}
                            {userType() === "advertiser" && (
                                <>
                                <div class="flex justify-between">
                                        <input
                                            type="text"
                                            class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-teal-500 focus:ring-1"
                                            placeholder="Full Name"
                                            name="fullName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                        />
                                        <input
                                            type="text"
                                            class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-teal-500 focus:ring-1"
                                            placeholder="Full Name"
                                            name="fullName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                        />
                                </div>
                                    
                                    {/* Add more advertiser-specific fields here */}
                                </>
                            )}

                            {userType() === "promoter" && (
                                <>

                                    <div class="flex flex-col space-y-4">
                                        <input
                                            type="text"
                                            class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-teal-500 focus:ring-1"
                                            placeholder="Full Name"
                                            name="fullName"
                                            required
                                            value={formData.fullName}
                                            onChange={handleChange}
                                        />
                                        {errors.fullName && <div class="text-red-500 text-sm">{errors.fullName}</div>}

                                        <input
                                            type="text"
                                            class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-teal-500 focus:ring-1"
                                            placeholder="Contact Info"
                                            name="contactInfo"
                                            required
                                            value={formData.contactInfo}
                                            onChange={handleChange}
                                        />
                                        {errors.contactInfo && <div class="text-red-500 text-sm">{errors.contactInfo}</div>}

                                        <textarea
                                            class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-teal-500 focus:ring-1"
                                            placeholder="Bio"
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                        ></textarea>
                                        {errors.bio && <div class="text-red-500 text-sm">{errors.bio}</div>}

                                        <input
                                            type="url"
                                            class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-teal-500 focus:ring-1"
                                            placeholder="Profile Picture URL"
                                            name="profilePicture"
                                            value={formData.profilePicture}
                                            onChange={handleChange}
                                        />
                                        {errors.profilePicture && <div class="text-red-500 text-sm">{errors.profilePicture}</div>}

                                        <PromotionMethods />
                                        {errors.promotionMethods && <div class="text-red-500 text-sm">{errors.promotionMethods}</div>}

                                        <TargetAudience />
                                        {errors.targetAudience && <div class="text-red-500 text-sm">{errors.targetAudience}</div>}


                                    </div>
                                </>
                            )}

                            <div className="flex justify-around">
                                <button
                                    type="submit"
                                    class="w-1/3 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 focus:outline-none"
                                    disabled={isLoading()}
                                    onclick={() => {
                                        setIsSelected(false)
                                        setAudience([])
                                        setSelectedMethods([])
                                    }}
                                >
                                    {'Cancel'}
                                </button>
                                <button
                                    type="submit"
                                    class="w-1/3 bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 focus:outline-none"
                                    disabled={isLoading()}
                                >
                                    {isLoading() ? "Loading..." : "Sign Up"}
                                </button>
                            </div>
                        </form>
                    </div>
                </Show>
                {/* {userType !== "select" && ( // Show form only after selecting user type
                    
                )} */}
            </main>
        </div>
    );
}

export default Onboarding;