import React from "react";
import { Provider } from "react-redux";

import Routing from "./Routing";
import store from "./redux/store";
import "./styles/globals.scss";
import "./App.scss";

const App = () => {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  );
};

export default App;
