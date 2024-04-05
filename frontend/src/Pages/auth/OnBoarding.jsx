import { createSignal, createEffect } from "solid-js";

function Onboarding() {
    const [userType, setUserType] = createSignal("select"); // Initial state: select user type
    const [formData, setFormData] = createSignal({
        username: "",
        password: "",
        email: "",
        // Add other fields as needed (advertiser/promoter)
        fullName: "",
        contactInfo: "",
        bio: "",
        profilePicture: "",
        promotionMethods: [], // Empty array for selected methods
        targetAudience: "",
        previousExperience: "",
        promotionLinks: "",
        paymentMethod: "", // Placeholder for payment info
    });

    const [errors, setErrors] = createSignal({});
    const [isLoading, setIsLoading] = createSignal(false);

    const handleUserTypeChange = (e) => setUserType(e.target.value);

    const handleChange = (e) => {
        setFormData({ ...formData(), [e.target.name]: e.target.value });
    };

    const handlePromotionMethodChange = (e) => {
        const method = e.target.value;
        const updatedMethods = formData().promotionMethods.slice();
        if (updatedMethods.includes(method)) {
            updatedMethods.splice(updatedMethods.indexOf(method), 1);
        } else {
            updatedMethods.push(method);
        }
        setFormData({ ...formData(), promotionMethods: updatedMethods });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors
        setIsLoading(true);

        // Implement your form submission logic here
        // This example simulates successful submission after 1 second
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Handle successful submission (redirect, etc.)
        console.log("Onboarding successful!");
        setIsLoading(false);
    };

    // Form validation example (add more validations as needed)
    createEffect(() => {
        const newErrors = {};
        if (userType === "select") {
            newErrors.userType = "Please select a user type";
        }
        if (!formData().username) {
            newErrors.username = "Username is required";
        }
        if (!formData().password) {
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
            <main class="flex flex-grow px-4 py-8">
                <div class="w-full md:w-1/2 px-4 py-4 bg-white shadow-md rounded-lg">
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
                </div>
                {userType !== "select" && ( // Show form only after selecting user type
                    <div class="w-full md:w-1/2 px-4 py-4 bg-white shadow-md rounded-lg mt-4 md:mt-0">
                        <form class="space-y-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-teal-500 focus:ring-1"
                                placeholder="Username"
                                value={formData().username}
                                name="username"
                                onChange={handleChange}
                            />
                            {errors.username && <div class="text-red-500 text-sm">{errors.username}</div>}

                            <input
                                type="password"
                                class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-teal-500 focus:ring-1"
                                placeholder="Password"
                                name="password"
                                value={formData().password}
                                onChange={handleChange}
                            />
                            {errors.password && <div class="text-red-500 text-sm">{errors.password}</div>}

                            <input
                                type="email"
                                class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-teal-500 focus:ring-1"
                                placeholder="Email"
                                name="email"
                                value={formData().email}
                                onChange={handleChange}
                            />

                            {/* Other fields based on user type */}
                            {userType() === "advertiser" && (
                                <>
                                    <input
                                        type="text"
                                        class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-teal-500 focus:ring-1"
                                        placeholder="Full Name"
                                        name="fullName"
                                        value={formData().fullName}
                                        onChange={handleChange}
                                    />
                                    {/* Add more advertiser-specific fields here */}
                                </>
                            )}

                            {userType() === "promoter" && (
                                <>
                                    <input
                                        type="text"
                                        class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-teal-500 focus:ring-1"
                                        placeholder="Contact Info"
                                        name="contactInfo"
                                        value={formData().contactInfo}
                                        onChange={handleChange}
                                    />
                                    {/* Add more promoter-specific fields here */}
                                </>
                            )}

                            <button
                                type="submit"
                                class="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 focus:outline-none"
                                disabled={isLoading()}
                            >
                                {isLoading() ? "Loading..." : "Sign Up"}
                            </button>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Onboarding;