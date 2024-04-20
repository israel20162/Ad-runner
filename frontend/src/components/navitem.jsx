import { createSignal, Show, For } from "solid-js";
import { FiChevronRight } from 'solid-icons/fi'
import { BiSolidAddToQueue } from 'solid-icons/bi'
export function NavItem(props) {
    const [isOpen, setIsOpen] = createSignal(false)

    return (
        <>
            <div class="flex transition-all duration-400 ease-linear   md:flex-row justify-start gap-2 items-center md:px-2 py-1 rounded-md  font-medium md:hover:bg-teal-600 hover:!text-white">


                {props.icon}
                <button class="px-5 py-2.5 text-center inline-flex items-center" onclick={props.isDropdown ? () => setIsOpen(prev => !prev) : ''}>

                    <span class="mr-2 md:text-base  md:text-inherit   ">

                        {props.title}


                    </span>

                    <Show when={props.isDropdown}>
                        <FiChevronRight classList={{ 'rotate-90': isOpen() }} class="w-6 h-6 ml-4 md:block transition-all duration-200   mt-1" />

                    </Show>



                </button>



            </div>

            <Show when={props.isDropdown}>
                <div id="dropdown" classList={{ hidden: !isOpen() }} class="z-10   bg-gray-50 divide-y divide-gray-100   ">
                    <ul class=" text-sm text-gray-700 " aria-labelledby="dropdownDefaultButton">
                        <For each={props.dropdownItems} fallback={<div>No items</div>}>
                            {(item) => {


                                return (
                                    <li
                                        onclick={() => {
                                            props.onClick.setView(item.title)
                                           if (props.isMobile) {
                                               props.onClick.setIsOpen(false)
                                               setIsOpen(false)
                                           }
                                        }}
                                        class="rounded my-2 px-4 py-2 md:hover:bg-teal-600 hover:!text-white">
                                        <button class="flex items-center gap-2">    <BiSolidAddToQueue size={24} class="text-teal-500 hover:!text-white  m-0 p-0" />    {item.title}</button>
                                        
                                    </li>)
                            }}

                        </For>


                    </ul>
                </div>
            </Show>


        </>
    );

}