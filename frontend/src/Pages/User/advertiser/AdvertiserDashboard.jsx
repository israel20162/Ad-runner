import { NavItem } from "../../../components/navitem";
import { BiSolidDashboard } from 'solid-icons/bi';
import { SiSparkpost } from 'solid-icons/si';
import { FaSolidMoneyBillTrendUp } from 'solid-icons/fa';
import { FiMenu } from 'solid-icons/fi'
import { TbStepInto } from 'solid-icons/tb';
import { HiOutlineCog6Tooth } from 'solid-icons/hi';
import { Switch, Match, createSignal, Show } from "solid-js";
import { BiSolidAddToQueue } from 'solid-icons/bi'
import { IoArrowBackOutline } from 'solid-icons/io'
import CampaignForm from "./CampaignForm";
import Dashboard from "./dashboard";




function AdvertiserDashboard() {
    const [view, setView] = createSignal('Dashboard')
    const [isOpen, setIsOpen] = createSignal(false);

    function toggleSidebar() {
        setIsOpen(prev => !prev);
    }


    const dropdownItems = [
        {
            title: 'New Campaign',
            icon: <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="overflow: visible; color: currentcolor;" height="1em" width="1em"><path d="M4 22h12v-2H4V8H2v12c0 1.103.897 2 2 2z"></path><path d="M20 2H8c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm-2 9h-3v3h-2v-3h-3V9h3V6h2v3h3v2z"></path></svg>
        },
        {
            title: 'Active Campaigns',
            icon: <BiSolidAddToQueue size={24} class="text-teal-500 hover:!text-white  m-0 p-0" />
        }]
    return (
        <div class="md:grid  md:h-screen overflow-y-scroll md:grid-cols-5 md:py-4 max-w-screen bg-gray-100">
            <aside class="hidden  md:block md:col-start-1 md:absolute md:top-0 md:left-0 ">
                <div class="w-screen  bg-teal-800 md:bg-transparent  md:h-screen md:w-64  md:shadow-md">
                    <nav class="flex  md:flex-col space-y-4 md:px-4 md:py-6">
                        <a href="/promoter/dashboard" class="flex items-center text-lg font-bold text-gray-800 hover:text-gray-700">
                            <span class="mr-2 hidden md:flex">Advertiser Dashboard</span>
                        </a>
                        <ul class="flex w-full justify-between md:flex-col md:space-y-4 text-black md:text-lg">
                            <li onclick={() => setView('Dashboard')}>

                                <NavItem title='Dashboard' icon={<BiSolidDashboard size={24} class="text-teal-500 m-0 p-0 hover:text-white" />} />
                            </li>
                            <li>
                                <NavItem title='Campaigns'
                                    icon={<SiSparkpost
                                        size={24}
                                        class="text-teal-500 hover:!text-white  m-0 p-0"
                                    />}
                                    isDropdown={true}
                                    onClick={{setView}}
                                    isMobile={false}
                                    dropdownItems={dropdownItems} />
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
            <nav class="md:hidden z-20     h-[60px]   flex [&>*]:my-auto px-2">
                <button
                    class="text-4xl flex "
                    onclick={() => {
                        setIsOpen(prev => !prev);
                    }}
                >
                    <FiMenu class="cursor-pointer " />
                </button>

            </nav>
            <div class="relative md:hidden">
                <aside classList={{ '!ml-0': isOpen() }} class="bg-gray-100  w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 !z-50 ml-[-250px] md:ml-0 ">
                    <nav class="md:hidden z-50  justify-end    h-[60px]   flex [&>*]:my-auto px-2">
                        <button
                            class="text-4xl flex "
                            onclick={() => {
                                setIsOpen(prev => !prev);
                            }}
                        >
                            <IoArrowBackOutline class="cursor-pointer " />
                        </button>
                        
                    </nav>
                    <main class="border-t md:hidden border-gray-300 p-2">
                        <a href="/promoter/dashboard" class="flex items-center text-lg font-bold text-gray-800 hover:text-gray-700">
                            <span class="mr-2 hidden md:flex">Advertiser Dashboard</span>
                        </a>
                        <ul class="flex w-full justify-between flex-col space-y-4  text-black md:text-lg">
                            <li onclick={() => { setView('Dashboard')
                             setIsOpen(false) }}>

                                <NavItem title='Dashboard' icon={<BiSolidDashboard size={24} class="text-teal-500 m-0 p-0 hover:text-white" />} />
                            </li>
                            <li>
                                <NavItem title='Campaigns'
                                    icon={<SiSparkpost
                                        size={24}
                                        class="text-teal-500 hover:!text-white  m-0 p-0"
                                    />}
                                    isDropdown={true}
                                    onClick={{ setView, setIsOpen }}
                                    isMobile={true}
                                    dropdownItems={dropdownItems} />
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

                    </main>
                </aside>
                <Show when={isOpen()}>
                    <div onclick={() => setIsOpen(false)} class="min-w-screen w-full fixed h-screen top-0 left-0  z-40 "></div>
                </Show>
            </div>




            <main class="col-span-full w-full col-start-2">


                <Switch fallback={<div>Not Found</div>}>

                    <Match when={view() == "Dashboard"}>

                        <div><Dashboard /></div>


                    </Match>

                    <Match when={view() == "Campaigns"}>

                        <div>Campaigns {view()}</div>

                    </Match>
                    <Match when={view() == "New Campaign"}>

                        <div><CampaignForm /></div>

                    </Match>
                    <Match when={view() == "Active Campaigns"}>

                        <div>Active Campaign</div>

                    </Match>

                </Switch>

            </main>
        </div>

    )
}

export default AdvertiserDashboard;