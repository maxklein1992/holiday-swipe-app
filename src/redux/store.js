import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const preloadedState = window.PRELOADED_STATE || {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

const store = createStore(
  rootReducer,
  {
    ...preloadedState,
  },
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
