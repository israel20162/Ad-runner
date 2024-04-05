/* @refresh reload */
import { render } from 'solid-js/web';
import { Router ,Route} from "@solidjs/router";
import { UserContextProvider } from './store/userContext';
import Login from "./Pages/auth/login";
import Register from "./Pages/auth/register";
import Home from "./Pages/home";
import Dashboard from "./Pages/Dashboard";
import Onboarding from "./Pages/auth/OnBoarding";
import './index.css'
import App from './App';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => <Router root={App}>

  <Route path="/" component={Home} />
  <Route path="/login" component={Login} />
  <Route path="/register" component={Register} />
  <Route path="/dashboard" component={Dashboard} />
  <Route path="/advertiser-signup" component={Onboarding} />
  <Route path="/promoter-signup" component={Onboarding} />
 




</Router>, root);
