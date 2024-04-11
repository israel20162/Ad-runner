import { NavItem } from "../../../components/navitem";
import { BiSolidDashboard } from 'solid-icons/bi';
import { SiSparkpost } from 'solid-icons/si';
import { FaSolidMoneyBillTrendUp } from 'solid-icons/fa';
import { FiMenu } from 'solid-icons/fi'
import { TbStepInto } from 'solid-icons/tb';
import { HiOutlineCog6Tooth } from 'solid-icons/hi';
import { Switch, Match, createSignal } from "solid-js";
import { AiTwotonePlusCircle } from 'solid-icons/ai';
import CampaignForm from "./CampaignForm";
import Dashboard from "./dashboard";




function AdvertiserDashboard() {
    const [view, setView] = createSignal('Dashboard')
    const [isOpen, setIsOpen] = createSignal(false);

    function toggleSidebar() {
        setIsOpen(prev => !prev);
    }
    const ModalOverlay = () => (
        <div
            class={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-gray-200/50 z-20`}
            onclick={() => {
                 setIsOpen(prev => !prev);
            }}
        />
    )

    const dropdownItems = [
        {
            title: 'New Campaign',
            icon: <AiTwotonePlusCircle size={24} class="text-teal-500 hover:!text-white  m-0 p-0" />
        },
        {
            title: 'Active Campaigns',
            icon: <AiTwotonePlusCircle size={24} class="text-teal-500 hover:!text-white  m-0 p-0" />
        }]
    return (
        <div class="md:grid  md:h-screen overflow-y-scroll md:grid-cols-5 md:py-4 max-w-screen bg-gray-100">
            <aside class=" hidden md:grid md:col-start-1 md:absolute md:top-0 md:left-0 ">
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
                                    onClick={setView}
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
            <nav class="md:hidden z-20    h-[60px]   flex [&>*]:my-auto px-2">
                <button
                    class="text-4xl flex "
                    onclick={() => {
                        setIsOpen(prev => !prev);
                    }}
                >
                    <FiMenu />
                </button>
            </nav>
            <aside classList={{ 'ml-0': isOpen() }} class="bg-gray-100  w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-50 ml-[-250px] md:ml-0">
                

                <Show when={isOpen()}>
                    <ModalOverlay />

                </Show>

            </aside>
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