import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import { useUserContext } from "../../store/userContext";


function Login() {
    const [email, setEmail] = createSignal('')

    const [password, setPassword] = createSignal('')
    const [error, setError] = createSignal('')
    const navigate = useNavigate()
    const [user, { LoginUser, LogoutUser }] = useUserContext();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email(), password: password() }),
            });

            if (!response.ok) {
                throw new Error(`Login failed with status ${response.status}`);
            }

            const data = await response.json();
            // console.log(data)
            //saves user data to store
            LoginUser(data)
            const token = data.token; // Assuming the server sends a token in response
            localStorage.setItem('token', token);
            setTimeout(() => {
                 navigate('/', { replace: true })
            }, 2000);
            
           
        } catch (error) {
            console.error('Login error:', error);
            setError('Invalid username or password'); // Update UI with error message
        }
    }
    return (
        <div class="h-screen">
            <div class="md:my-12 bg-white mt-8  p-8 flex justify-center items-center">
                <div class="max-w-md w-full md:px-6 rounded-lg shadow-lg border-0.5 p-4 md:p-8">
                    <div class="text-center rounded-lg">
                        <h2 class="text-3xl font-semibold text-gray-800">Log in to Your Account</h2>
                        <p class="mt-2 text-gray-600">Welcome back! Log in to access your account.</p>
                    </div>
                    <div class="bg-white mt-8 d p-8">
                        <form onsubmit={handleSubmit}>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-semibold mb-2" for="email">Email Address</label>
                                <input type="email"
                                    id="email"
                                    name="email"
                                    class="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:border-teal-500"
                                    placeholder="Your email address"
                                    value={email()}
                                    oninput={(e) => setEmail(e.currentTarget.value)} />
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
                                    oninput={(e) => setPassword(e.currentTarget.value)} />
                            </div>
                            <button type="submit" class="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600">Log in</button>
                            <span class="text-red-500 font-bold ">{error()}</span>
                        </form>
                        <p class="mt-4 text-center text-gray-600">Don't have an account? <a href="#" class="text-teal-500 hover:underline">Register here</a>.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;