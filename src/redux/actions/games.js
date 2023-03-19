import {
  collection,
  addDoc,
  where,
  query,
  getDocs,
  setDoc,
  add,
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

    const response = [];

    const querySnapshot = await getDocs(queryResult);
    querySnapshot.forEach((doc) => {
      const structuredData = {
        id: doc.id,
        ...doc.data(),
      };
      response.push(structuredData);
    });

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

const dummyGameType = 0;

export const createGame =
  ({ userEmail, email }) =>
  async (dispatch) => {
    try {
      const newDoc = {
        emails: [userEmail, email],
        participants: [
          {
            email: userEmail,
            hasCompleted: false,
          },
          {
            email: email,
            hasCompleted: false,
          },
        ],
        created_by: userEmail,
        created_date: null,
        game_type: dummyGameType,
      };

      await addDoc(collection(database, "games"), newDoc);

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
