import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { makePersisted } from "@solid-primitives/storage";

const initialState = {
    user: {},
    isLoggedIn: false
};
export const UserContext = createContext(initialState);
const userStore = createStore({ user: "user" || {}, isLoggedIn: false })


export function UserContextProvider(props) {
    const [state, setState] = makePersisted(userStore, { storage: sessionStorage, name: 'user' });
    const user = [
        state,
        {

            LoginUser: function (user) {

                setState("user", user);
                setState("isLoggedIn", true);

            },

            LogoutUser: function () {

                setState("user", null);
                setState("isLoggedIn", false);

            },

        },

    ]


    return (

        <UserContext.Provider value={user}>

            {props.children}

        </UserContext.Provider>

    );


}
export function useUserContext() { return useContext(UserContext); }
