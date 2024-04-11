/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, Route } from "@solidjs/router";
import Login from "./Pages/auth/login";
import Register from "./Pages/auth/register";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Onboarding from "./Pages/auth/OnBoarding";
import PromoterDashboard from "./Pages/User/promoter/PromoterDashboard";
import AdvertiserDashboard from './Pages/User/advertiser/AdvertiserDashboard';
import './index.css';
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
  <Route path="/promoter/dashboard" component={PromoterDashboard} />
  <Route path="/advertiser/dashboard" component={AdvertiserDashboard} />






</Router>, root);
