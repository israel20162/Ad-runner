import { createSignal, Show } from "solid-js";
import { useUserContext } from "../store/userContext";
import { useNavigate } from "@solidjs/router";

function ProfileIcon(props) {
    const [isOpen, setIsOpen] = createSignal(false);
    const [state, { LoginUser, LogoutUser }] = useUserContext()
    const navigate = useNavigate()
    // Function to get the first letter of the name
    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : '';
    };


    const toggleMenu = () => {
        setIsOpen(!isOpen());
    };
    const handleLogout = () => {
        LogoutUser()
        navigate('/', { replace: true })
        console.log("Logging out...");
    };

    return (
        <li>
            <div class="relative">
                <button onclick={toggleMenu}>
                    {props.image ? (
                        <img src={props.image} alt="Profile" class="w-10 h-10 rounded-full object-cover" />
                    ) : (
                        <div class="w-10 h-10 flex items-center justify-center rounded-full bg-teal-500 text-white">
                            <span class="text-2xl font-semibold">{getInitials(props.name)}</span>
                        </div>
                    )}
                </button>
                <Show when={isOpen()}>
                    <div onclick={() => setIsOpen(false)} class="min-w-screen w-full fixed h-screen top-0 left-0  z-40 "></div>
                    <div class="absolute z-50 right-0 cursor-pointer mt-2 w-48 bg-white rounded-md shadow-lg">
                        <div class="py-1 cursor-pointer">
                            <div class="hover:cursor-pointer"><button class="block hover:cursor-pointer w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleLogout}>Logout</button></div>
                            <div><button class="block hover:cursor-pointer w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => {
                                navigate('/promoter/dashboard', { replace: true });
                                setIsOpen(false)
                            }
                            }>Dashboard</button></div>
                        </div>
                    </div>
                </Show>
            </div>
        </li>

    );
}

export default ProfileIcon;