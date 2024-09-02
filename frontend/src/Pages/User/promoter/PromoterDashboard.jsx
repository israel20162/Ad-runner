import { createSignal, Switch, Match } from "solid-js";
import { BiSolidDashboard } from 'solid-icons/bi';
import { SiSparkpost } from 'solid-icons/si';
import { FaSolidMoneyBillTrendUp } from 'solid-icons/fa';
import { TbStepInto } from 'solid-icons/tb';
import { HiOutlineCog6Tooth } from 'solid-icons/hi';
import { PromoterSubmissions } from "./PromoterSubmissions";
import { NavItem } from "../../../components/navitem";
import Dashboard from "./dashboard";


export default function PromoterDashboard() {

    const [view, setView] = createSignal('Dashboard')
    const [isOpen, setIsOpen] = createSignal(false);
    function toggleSidebar() {
        setIsOpen(prev => !prev);
    }

    // Fetch user data and campaigns on component mount

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };




    return (
        <div class="md:grid  md:h-screen md:grid-cols-5 md:py-4 max-w-screen bg-gray-100">




            <aside class="flex static md:grid md:col-start-1 md:absolute md:top-0 md:left-0 ">
                <div class="w-screen  bg-teal-800 md:bg-transparent  md:h-screen md:w-64  md:shadow-md">
                    <nav class="flex  md:flex-col space-y-4 md:px-4 md:py-6">
                        <a href="/promoter/dashboard" class="flex items-center text-lg font-bold text-gray-800 hover:text-gray-700">
                            <span class="mr-2 hidden md:flex">Promoter Dashboard</span>
                        </a>
                        <ul class="flex w-full justify-between md:flex-col md:space-y-4 text-black md:text-lg">
                            <li onclick={() => setView('Dashboard')}>

                                <NavItem title='Dashboard' icon={<BiSolidDashboard size={24} class="text-teal-500 m-0 p-0 hover:text-white" />}
                                    />
                            </li>
                            <li onclick={() => setView('Campaigns')}>

                                <NavItem title='Campaigns' icon={<SiSparkpost size={24} class="text-teal-500 hover:!text-white  m-0 p-0" />}  />
                            </li>
                            <li>
                                <NavItem title='Earnings' icon={<FaSolidMoneyBillTrendUp size={24} class="text-teal-500 hover:!text-white  m-0 p-0" />} />

                            </li>
                            <li>
                                <NavItem title='Submissions' icon={<TbStepInto size={24} class="text-teal-500 hover:!text-white  m-0 p-0" />} />
                            </li>
                            <li>
                                <NavItem title='Settings' icon={<HiOutlineCog6Tooth size={24} class="text-teal-500 hover:!text-white  m-0 p-0" />} />
                            </li>

                        </ul>
                    </nav>
                </div>

            </aside>
            <main class="col-span-full w-full col-start-2">
                <Switch fallback={<div>Not Found</div>}>

                    <Match when={view() == "Dashboard"}>

                        <div>
                            <Dashboard />
                            <PromoterSubmissions />
                        </div>


                    </Match>
                    <Match when={view() == 'Campaigns'}>
                        <div>
                            Campaigns
                        </div>
                    </Match>
                </Switch>


            </main>


        </div>
    );
}
