import { createSignal, Show } from "solid-js";
import { useUserContext } from "../../store/userContext";
import ProfileIcon from "../../components/profileIcon";
import { useNavigate } from "@solidjs/router";

function Layout(props) {
   

  
    const [state] = useUserContext()
   

    return (
        <>
            <div class="flex flex-col max-w-[100vw] overflow-x-clip">
               
                <header class="bg-teal-800 py-4 md:flex hidden">
                    <div class="container mx-auto px-4 flex items-center justify-between">
                        <h1 class="text-white text-xl font-semibold">AdRun</h1>
                        <nav>
                            <ul class="flex items-center space-x-8">
                                <li><a href="/" class="text-white hover:text-teal-300">Home</a></li>
                                <li><a href="/advertiser/dashboard" class="text-white hover:text-teal-300">Dashboard</a></li>
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
                <div class="h-screen  relative">
                    

                    {/* Main Content */}
                    <main class="w-screen">
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

               
               


                </div>

            </div>
        </>
    );
}

export default Layout;