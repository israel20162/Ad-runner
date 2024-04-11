import { createSignal, Show, For } from "solid-js";
import { FiChevronRight } from 'solid-icons/fi'
export function NavItem(props) {
    const [isOpen, setIsOpen] = createSignal(false)
    
    return (
        <>
            <div class="flex transition-all duration-400 ease-linear  flex-col md:flex-row justify-start gap-2 items-center md:px-2 py-1 rounded-md  font-medium md:hover:bg-teal-600 hover:!text-white">


                {props.icon}
                <button class="px-5 py-2.5 text-center inline-flex items-center" onclick={props.isDropdown ? () => setIsOpen(prev => !prev) : ''}>

                    <span class="mr-2 md:text-base text-sm text-white md:text-inherit   ">

                        {props.title}


                    </span>

                    <Show when={props.isDropdown}>
                        <FiChevronRight classList={{ 'rotate-90': isOpen() }} class="w-6 h-6 ml-4 hidden md:block transition-all duration-200   mt-1" />

                    </Show>



                </button>



            </div>

            <Show when={props.isDropdown}>
                <div id="dropdown" classList={{ hidden: !isOpen() }} class="z-10  bg-gray-50 divide-y divide-gray-100   ">
                    <ul class=" text-sm text-gray-700 " aria-labelledby="dropdownDefaultButton">
                        <For each={props.dropdownItems} fallback={<div>No items</div>}>
                            {(item) => {


                                return (
                                    <li onclick={() => props.onClick(item.title)} class="block  rounded my-2 px-4 py-2 md:hover:bg-teal-600 hover:!text-white">
                                        <button class="flex items-center justify-evenly gap-2 " >{item.icon}{item.title}</button>
                                    </li>)
                            }}

                        </For>


                    </ul>
                </div>
            </Show>
        

        </>
    );

}