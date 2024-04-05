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
                    <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                        <ul class="py-1">
                            <li><button class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                </Show>
            </div>
        </li>

    );
}

export default ProfileIcon;