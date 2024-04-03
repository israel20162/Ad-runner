import { createSignal } from "solid-js";
import Layout from "./Pages/layout/layout";
import { Router, Route } from "@solidjs/router";


import Home from "./Pages/home";
function App() {
  return (
    <Layout>
      <Router>
        <Route path="/" component={Home} />
      </Router>
     
    </Layout>

  );
}

export default App;