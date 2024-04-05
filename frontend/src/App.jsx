import Layout from "./Pages/layout/layout";
import { Router, Route } from "@solidjs/router";
import Login from "./Pages/auth/login";
import Register from "./Pages/auth/register";
import Home from "./Pages/home";
import { UserContextProvider } from "./store/userContext";
import Dashboard from "./Pages/Dashboard";
import Onboarding from "./Pages/auth/OnBoarding";

function App(props) {

  return (
    <UserContextProvider >
 <Layout>
  {props.children}

     </Layout>

    </UserContextProvider>

  );
}

export default App;