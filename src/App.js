import { Provider } from "react-redux";

import Routing from "./Routing";
import Layout from "./components/layout";
import store from "./redux/store";
import "./App.scss";

const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Routing />
      </Layout>
    </Provider>
  );
};

export default App;
