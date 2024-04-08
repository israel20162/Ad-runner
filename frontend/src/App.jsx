import Layout from "./Pages/layout/layout";
import { UserContextProvider } from "./store/userContext";


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