import { createSignal, Show } from "solid-js";

function Home() {
    const [heroSectionVisible, setHeroSectionVisible] = createSignal(true);
    const [isHoveringCenter, setIsHoveringCenter] = createSignal(false);

    const handleMouseEnterCenter = () => setIsHoveringCenter(true);
    const handleMouseLeaveCenter = () => setIsHoveringCenter(false);


    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <div class=" flex flex-col  md:gap-20">
            <div>
                <h1 class="text-4xl text-center font-semibold">Welcome to AdRun</h1>
                <p class="text-gray-600 text-center">The best platform for running ads!</p>
            </div>
            <section class={heroSectionVisible() ? "md:h-full md:flex md:flex-col items-center my-12 md:my-" : "h-0"}>
                <div class="md:grid grid-cols-1 md:grid-cols-2 md:gap-8">
                    <div class="flex flex-col md:space-y-8 space-y-4 px-4">
                        <h1 class="md:text-4xl text-2xl text-cente font-bold text-gray-600 md:mb-8">Boost Your Brand with Targeted Social Media Promotion</h1>
                        {/* <h1 class="text-4xl font-bold text-gray-800 mb-4">Effortless Payments Made Simple</h1> */}
                        <p class="md:text-xl text-lg leading-tight text-gray-600">
                            With Adrunner you earn daily by simply posting adverts on your <span class="text-blk font-bold">social media</span>  for businesses and firms. As a Buisness you can reach the right audience and achieve your marketing goals.
                            {/* Streamline your financial operations with our secure and user-friendly payment platform. */}
                           
                        </p>
                        {/* <button class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded shadow-md" onClick={scrollToFeatures}>
                            Explore Features
                        </button> */}

                        <p class="text-xl text-gray-600 text-center mb-4"></p>
                        <div class="flex justify-start">
                            <button class="bg-teal-500 hover:bg-teal-700 text-white font-bold text-sm md:text-base whitespace-nowrap py-4 md:py-2 px-4 rounded shadow-md mr-4" >
                                <a href="/register">                                Sign Up as Advertiser</a>
                            </button>
                            <button class="bg-gray-50 hover:bg-gray-100 text-teal-500 font-bold text-sm md:text-base whitespace-nowrap py-4 md:py-2 px-4 rounded shadow-md" >
                               <a href="/register">Sign Up as Promoter</a> 
                            </button>
                        </div>
                        <button class="fixed bottom-4 right-4 focus:outline-none" onClick={scrollToTop}>
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7 -7l7 7"></path></svg>
                        </button>
                    </div>
                    <div class="hidden md:flex justify-center items-center">
                        <img src="/src/assets/heroimage.jpg" alt="Hero Image" class="w-full md:h-auto max-h-80 object-cover rounded-lg" />
                    </div>
                </div>
            </section>

            <section class="py-12 px-4">
                <h2 class="text-3xl font-bold mb-8 text-center">Benefits of Adrunner</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="flex flex-col items-center">
                        <img class="h-32  object-cover text-teal-500" src="/src/assets/post.svg" alt="" srcset="" />

                        <h3 class="text-xl font-bold mb-2">Post Your Ad</h3>
                        <p class="text-gray-700">Create compelling ads targeting your ideal audience.</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <img class="h-32  object-cover text-teal-500" src="/src/assets/growth.svg" alt="" srcset="" />
                        <h3 class="text-xl font-bold mb-2">Promote Your Brand</h3>
                        <p class="text-gray-700">Reach a wider audience through social media promoters.</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <img class="h-32  object-cover text-teal-500" src="/src/assets/gain.svg" alt="" srcset="" />

                        <h3 class="text-xl font-bold mb-2">Make Money</h3>
                        <p class="text-gray-700 text-center">Get paid for using your social media to run ads </p>
                    </div>
                    <div class="flex flex-col items-center">
                        <img class="h-32  object-cover text-teal-500" src="/src/assets/g.svg" alt="" srcset="" />

                        <h3 class="text-xl font-bold mb-2">Gain Exposure</h3>
                        <p class="text-gray-700">Reach a wider audience and boost your sales with targeted advertising. </p>
                    </div>
                </div>
            </section>
            <section class="py-12">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="flex flex-col items-center px-4">
                        <h2 class="text-3xl font-bold mb-4 text-gray-800">Why Choose Us for Advertising?</h2>
                        <p class="text-xl text-gray-600 text-center">
                            From the quickest campaign endorsement to programmed campaign streamlining, your Ads can be highly effective.
                        </p>
                        {/* Add a button component here */}
                    </div>
                    <div
                        class={`  flex flex-col items-center px-4 rounded   transition duration-300 ease-in-out ${isHoveringCenter ? "cursor-pointer" : ""
                            }`}
                        onMouseEnter={handleMouseEnterCenter}
                        onMouseLeave={handleMouseLeaveCenter}
                    >
                        <h2 class="text-3xl font-bold mb-4">Are you an Advertiser?</h2>
                        <p class="md:text-xl text-center">Drive quality traffic and expand your audience</p>
                        <button class="bg-white hover:text-white hover:bg-teal-500 text-teal-500 font-bold py-2 px-4 rounded shadow-md mt-4">
                            Learn More
                        </button>
                    </div>
                    <div class="bg-teal-00  flex flex-col items-center px-4 rounded  transition duration-300 ease-in-out">
                        <h2 class="text-3xl font-bold mb-4">Are you a Publisher?</h2>
                        <p class="md:text-xl text-center">Monetize your Whatsapp Status and optimize your earnings.</p>
                        <button class="bg-white hover:text-white hover:bg-teal-500 text-teal-500 font-bold py-2 px-4 rounded shadow-md mt-4">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            <section>
               
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-white rounded-lg overflow-hidden shadow-lg">
                        <div class="p-6">
                            <h2 class="text-xl font-semibold mb-4 text-teal-800">Ad Placement</h2>
                            <p class="text-gray-700">Reach your target audience by placing ads on our platform.</p>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg overflow-hidden shadow-lg">
                        <div class="p-6">
                            <h2 class="text-xl font-semibold mb-4 text-teal-800">Analytics</h2>
                            <p class="text-gray-700">Track the performance of your ads with detailed analytics.</p>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg overflow-hidden shadow-lg">
                        <div class="p-6">
                            <h2 class="text-xl font-semibold mb-4 text-teal-800">Customer Support</h2>
                            <p class="text-gray-700">Get help and assistance from our dedicated customer support team.</p>
                        </div>
                    </div>
                </div>

            </section>



            <section class="py-12 ">
                <div class="container mx-auto px-4">
                    <h2 class="text-3xl font-bold mb-8 text-center">How it Works</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div class="flex flex-col space-y-6">
                            <h3 class="text-2xl font-bold mb-2 text-gray-800">For Advertisers</h3>
                            <p class="text-gray-600">Reach your target audience and drive sales with targeted advertising.</p>
                            <ul class="list-disc space-y-2 pl-4">
                                <li class=""> Create an Account</li>
                                <li>Create compelling ads targeting your ideal customer demographics (age, interests, etc.).</li>
                                <li>Set your budget and campaign duration.</li>
                                <li>Our platform connects you with a network of qualified promoters who will showcase your ad to their audience.</li>
                                <li>Track the performance of your campaigns in real-time and optimize for success.</li>
                            </ul>
                            <a href="/advertiser-signup" class="inline-flex items-center px-4 py-2  text-teal-500 font-bold rounded ">
                                Create Your Ad Now
                                <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </a>
                        </div>
                        <div class="flex flex-col space-y-6">
                            <h3 class="text-2xl font-bold mb-2 text-gray-800">For Promoters</h3>
                            <p class="text-gray-600">Earn money by promoting top brands on your social media platforms.</p>
                            <ul class="list-disc space-y-2 pl-4">
                                <li class=""> Create an Account</li>
                                <li>Sign up and browse a wide variety of ads from established brands.</li>
                                <li>Choose ads that resonate with your audience and content.</li>
                                <li>Share the ads on your social media platforms (Instagram, WhatsApp, etc.) following our guidelines.</li>
                                <li>Earn commission for every successful click or conversion (sale) generated through your promotions.</li>
                            </ul>
                            <a href="/promoter-signup" class="inline-flex items-center px-4 py-2 0 text-teal-500 font-bold rounded shadow-m">
                                Sign Up & Start Earning  <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></a>
                        </div>
                    </div>
                </div>
            </section>
          
        </div>

    )
}

export default Home;