import { Provider } from "react-redux";

import Routes from "./Routes";
import Layout from "./components/layout";
import store from "./redux/store";
import "./App.scss";

const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Routes />
      </Layout>
    </Provider>
  );
};

export default App;
