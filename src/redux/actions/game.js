import {
  collection,
  addDoc,
  where,
  getCountFromServer,
  query,
} from "firebase/firestore";
import { games } from "../../constants/collections";

import database from "../../firebase/firebase";

export const GAME_CREATE = "GAME_CREATE";
export const GAME_CREATE_FAILED = "GAME_CREATE_FAILED";
export const GAMES_FETCH = "GAMES_FETCH";
export const GAMES_FETCH_FAILED = "GAMES_FETCH_FAILED";

export const getGames = (userId) => async (dispatch) => {
  try {
    const q = query(collection(database, games), where("emails", "==", true));

    console.log(q, "www");

    return dispatch({
      type: GAMES_FETCH,
    });
  } catch (error) {
    console.log(error, "error");
    return dispatch({
      type: GAMES_FETCH_FAILED,
    });
  }
};

export const createGame = (emails) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(database, games), emails);

    return dispatch({
      type: GAME_CREATE,
    });
  } catch (error) {
    console.log(error, "error");
    const res = error.response;

    return dispatch({
      type: GAME_CREATE_FAILED,
      error: res.data[0].code,
    });
  }
};
