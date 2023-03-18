import { combineReducers } from "redux";

import auth from "./auth";
import games from "./games";
import user from "./user";

const rootReducer = combineReducers({ auth, games, user });

export default rootReducer;
