import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";



function Register() {
    const [name, setName] = createSignal("");
    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [emailExists, setEmailExists] = createSignal(false);
    const [usernameExists, setUsernameExists] = createSignal(false);

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            name: name(),
            email: email(),
            password: password(),
        };

        const checkUsername = async () => {
            const response = await fetch('http://localhost:5000/api/auth/check-username', {
                method: 'POST',
                headers: {
                    Accept: 'application.json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: userData.name }),

            })
            const res = await response.json()
            console.log(res);
            setUsernameExists(res)


        }
        const checkEmail = async () => {
            const response = await fetch('http://localhost:5000/api/auth/check-email', {
                method: 'POST',
                headers: {
                    Accept: 'application.json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: userData.email }),

            })
            const res = await response.json()

            setEmailExists(res)

        }
        await checkUsername()
        await checkEmail()
        if (!!emailExists && !!usernameExists) {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    Accept: 'application.json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),

            })

            const user = await response.json()

            user.message && navigate("/login", { replace: true });
        } else {

        }



    }



    return (
        <div class="h-screen">
            <div class="md:my-12 bg-white mt-8  p-8 flex justify-center items-center">
                <div class="md:max-w-md w-full md:px-6 rounded-lg shadow-lg border-0.5 p-4 md:p-8">
                    <div class="text-center">
                        <h2 class="text-3xl font-semibold text-gray-800">Create an Account</h2>
                        <p class="mt-2 text-gray-600">Sign up to get started with our platform.</p>
                    </div>
                    <div class="bg-white mt-8   p-8">
                        <form onSubmit={handleSubmit}>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-semibold mb-2" for="name">Name</label>
                                <input
                                    type="text"
                                    required
                                    id="name"
                                    name="name"
                                    class="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:border-teal-500"
                                    placeholder="Your name"
                                    value={name()}
                                    onInput={(e) => setName(e.currentTarget.value)} />
                                <span class="text-red-500 text-sm">{usernameExists() ? 'username already in use' : ''}</span>
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-semibold mb-2" for="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    class="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:border-teal-500"
                                    placeholder="Your email address"
                                    value={email()}
                                    onInput={(e) => setEmail(e.currentTarget.value)} />
                                <span class="text-red-500 text-sm">{emailExists() ? 'email already in use' : ''}</span>
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-semibold mb-2" for="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    class="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:border-teal-500"
                                    placeholder="Your password"
                                    value={password()}
                                    onInput={(e) => setPassword(e.currentTarget.value)} />
                            </div>
                            <button type="submit" class="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600">Sign up</button>
                        </form>
                        <p class="mt-4 text-center text-gray-600">Already have an account? <a href="/login" class="text-teal-500 hover:underline">Log in here</a>.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;