import { createSignal, Show } from "solid-js";
import { useUserContext } from "../../store/userContext";
import ProfileIcon from "../../components/profileIcon";
import { useNavigate } from "@solidjs/router";

function Layout(props) {
    const [showSidebar, setShowSidebar] = createSignal(false);

    const toggleSidebar = () => setShowSidebar(prev => !prev);
    const [state] = useUserContext()
   

    return (
        <>
            <div class="flex flex-col gap-">
                {/* <nav class="w-24 flex h-full flex-col items-center bg-teal-500 text- dark:bg-gray-800 py-4">

                <div>

                    <svg
                        class="h-8 w-8 fill-current  dark:text-blue-300"
                        viewBox="0 0 24 24">
                        <path
                            d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3m6.82
					6L12 12.72 5.18 9 12 5.28 18.82 9M17 16l-5 2.72L7 16v-3.73L12
					15l5-2.73V16z"></path>
                    </svg>

                </div>

                <ul class="mt-2 text-gray-700 dark:text-gray-400 capitalize">

                    <li class="mt-3 p-2 text-white dark:text-blue-300 rounded-lg">
                        <a href="#" class=" flex flex-col items-center">
                            <svg class="fill-current h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9
							17v2H5v-2h4M21 3h-8v6h8V3M11 3H3v10h8V3m10
							8h-8v10h8V11m-10 4H3v6h8v-6z"></path>
                            </svg>
                            <span class="text-xs mt-2">dashBoard</span>
                        </a>

                    </li>

                    <li
                        class="mt-3 p-2 hover:text-blue-600 text-white dark-hover:text-blue-300
				rounded-lg">
                        <a href="#" class=" flex flex-col items-center">
                            <svg class="fill-current h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    d="M23 3v-.5a2.5 2.5 0 00-5 0V3c-.55 0-1 .45-1 1v4c0
							.55.45 1 1 1h5c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1m-1
							0h-3v-.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V3M6
							11h9v2H6v-2m0-4h9v2H6V7m16 4v5c0 1.11-.89 2-2 2H6l-4
							4V4a2 2 0 012-2h11v2H4v13.17L5.17 16H20v-5h2z"></path>
                            </svg>
                            <span class="text-xs mt-2">messages</span>
                        </a>

                    </li>

                    <li
                        class="mt-3 p-2 hover:text-blue-600 text-white dark-hover:text-blue-300
				rounded-lg">
                        <a
                            href="#"
                            class=" flex flex-col items-center">
                            <svg class="fill-current h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    d="M21 18v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0
							012-2h14a2 2 0 012 2v1h-9a2 2 0 00-2 2v8a2 2 0 002
							2m0-2h10V8H12m4 5.5a1.5 1.5 0 01-1.5-1.5 1.5 1.5 0
							011.5-1.5 1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5z"></path>
                            </svg>
                            <span class="text-xs mt-2">earnings</span>
                        </a>

                    </li>

                    <li
                        class="mt-3 p-2 hover:text-blue-600 text-white dark-hover:text-blue-300
				rounded-lg">
                        <a href="#" class=" flex flex-col items-center">
                            <svg class="fill-current h-5 w-5" viewBox="0 0 512 512">
                                <path
                                    d="M505 442.7L405.3
							343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7
							44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208
							208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7
							17l99.7 99.7c9.4 9.4 24.6 9.4 33.9
							0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7
							0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128
							57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                            </svg>
                            <span class="text-xs mt-2">jobs</span>
                        </a>

                    </li>

                    <li
                        class="mt-3 p-2 hover:text-blue-600 text-white dark-hover:text-blue-300
				rounded-lg">
                        <a href="#" class=" flex flex-col items-center">
                            <svg class="fill-current h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    d="M19 19H5V8h14m0-5h-1V1h-2v2H8V1H6v2H5a2 2 0 00-2
							2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2m-2.47
							8.06L15.47 10l-4.88 4.88-2.12-2.12-1.06 1.06L10.59
							17l5.94-5.94z"></path>
                            </svg>
                            <span class="text-xs mt-2">schedule</span>
                        </a>

                    </li>

                    <li class="mt-3 p-2 hover:text-blue-600 text-white rounded-lg">
                        <a
                            href="#"
                            class=" flex flex-col items-center">
                            <svg class="fill-current h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0
							001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"></path>
                            </svg>
                            <span class="text-xs mt-2">lesson</span>
                        </a>

                    </li>

                </ul>

                <div
                    class="mt-auto flex items-center p-2 text-blue-700 bg-purple-200
			dark:text-blue-500 rounded-full">


                    <a href="#">
                        <svg class="fill-current h-5 w-5" viewBox="0 0 24 24">
                            <path
                                d="M12 1c-5 0-9 4-9 9v7a3 3 0 003 3h3v-8H5v-2a7 7 0 017-7
						7 7 0 017 7v2h-4v8h4v1h-7v2h6a3 3 0
						003-3V10c0-5-4.03-9-9-9z"></path>
                        </svg>
                    </a>

                </div>

            </nav> */}
                {/* Sidebar (Optional) */}
                {/* <Show when={showSidebar()}>
                <div class="fixed inset-y-0 left-0 w-64  text-white h-screen overflow-y-auto ">
                   Sidebar content (navigation links, etc.) 
                    <button class="absolute top-4 right-4 focus:outline-none" onclick={toggleSidebar}>
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L19 12L6 6"></path></svg>
                    </button>
                  
                </div>
            </Show> */}
                <header class="bg-teal-800 py-4">
                    <div class="container mx-auto px-4 flex items-center justify-between">
                        <h1 class="text-white text-xl font-semibold">AdRun</h1>
                        <nav>
                            <ul class="flex items-center space-x-8">
                                <li><a href="/" class="text-white hover:text-teal-300">Home</a></li>
                                <li><a href="/dashboard" class="text-white hover:text-teal-300">Dashboard</a></li>
                                <li><a href="#" class="text-white hover:text-teal-300">Ads</a></li>
                                <li><a href="#" class="text-white hover:text-teal-300">About</a></li>
                                <li><a href="#" class="text-white hover:text-teal-300">Contact</a></li>
                               {!state.isLoggedIn ? <li class="ml-16 flex gap-2">
                                    <a href="/login" class="text-white hover:text-teal-300">Login</a>
                                    <a href="/register" class="text-white hover:text-teal-300">Register</a>
                                </li> : <ProfileIcon name={state.user?.username} />}
                            </ul>
                        </nav>
                    </div>
                </header>


                {/* Main Content Area */}
                <div class="h-screen relative">
                    {/* Header */}
                    {/* <header class="bg-teal-500 shadow-sm py-4 px-4 flex justify-between items-center text-white">
                    <h1 class="text-xl font-bold">Your Website Name</h1>
                    <button class="focus:outline-none" onClick={toggleSidebar}>
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16v12H4zm2-2a2 2 0 10-4 0 2 2 0 004 0z"></path></svg>
                    </button>
                </header> */}

                    {/* Main Content */}
                    <main class="!relative">
                        {props.children}
                        <div class="bg-teal-800  py-6">
                            <div class="container mx-auto px-4">
                                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    <div>
                                        <h3 class="text-white text-lg font-semibold mb-4">About Us</h3>
                                        <p class="text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sodales eleifend ipsum, et pharetra mi malesuada vitae.</p>
                                    </div>
                                    <div>
                                        <h3 class="text-white text-lg font-semibold mb-4">Quick Links</h3>
                                        <ul>
                                            <li><a href="#" class="text-gray-300 hover:text-white">Home</a></li>
                                            <li><a href="#" class="text-gray-300 hover:text-white">Ads</a></li>
                                            <li><a href="#" class="text-gray-300 hover:text-white">About</a></li>
                                            <li><a href="#" class="text-gray-300 hover:text-white">Contact</a></li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 class="text-white text-lg font-semibold mb-4">Connect With Us</h3>
                                        <ul>
                                            <li><a href="#" class="text-gray-300 hover:text-white">Facebook</a></li>
                                            <li><a href="#" class="text-gray-300 hover:text-white">Twitter</a></li>
                                            <li><a href="#" class="text-gray-300 hover:text-white">Instagram</a></li>
                                            <li><a href="#" class="text-gray-300 hover:text-white">LinkedIn</a></li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 class="text-white text-lg font-semibold mb-4">Subscribe</h3>
                                        <form>
                                            <input type="email" placeholder="Your email address" class="w-full py-2 px-4 mb-2 rounded bg-gray-200 text-gray-800" />
                                            <button type="submit" class="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700">Subscribe</button>
                                        </form>
                                    </div>
                                </div>
                                <p class="text-gray-300 text-center mt-8">© 2024 AdRun. All rights reserved.</p>
                            </div>
                        </div>
                    </main>

                    {/* Footer (Optional) */}


                </div>

            </div>
        </>
    );
}

export default Layout;