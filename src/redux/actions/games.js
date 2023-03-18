import {
  collection,
  addDoc,
  where,
  getCountFromServer,
  query,
  getDocs,
} from "firebase/firestore";
import { games } from "../../constants/collections";

import database from "../../firebase/firebase";

export const GAME_CREATE = "GAME_CREATE";
export const GAME_CREATE_FAILED = "GAME_CREATE_FAILED";
export const GAMES_FETCH = "GAMES_FETCH";
export const GAMES_FETCH_FAILED = "GAMES_FETCH_FAILED";

export const fetchGames = (email) => async (dispatch) => {
  try {
    const queryResult = query(
      collection(database, games),
      where("emails", "array-contains", email)
    );

    const snapshot = await getDocs(queryResult);

    const response = snapshot.docs.map((doc) => doc.data());

    return dispatch({
      type: GAMES_FETCH,
      games: response,
    });
  } catch (error) {
    console.log(error, "error");
    const res = error.response;

    return dispatch({
      type: GAMES_FETCH_FAILED,
      error: res.data[0].code,
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
