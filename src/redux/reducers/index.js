import { combineReducers } from "redux";

import auth from "./auth";
import game from "./game";
import user from "./user";

const rootReducer = combineReducers({ auth, game, user });

export default rootReducer;
