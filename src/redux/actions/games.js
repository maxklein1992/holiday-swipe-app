import {
  collection,
  addDoc,
  where,
  doc,
  updateDoc,
  query,
  getDocs,
  setDoc,
  getDoc,
  add,
} from "firebase/firestore";
import { games } from "../../constants/collections";

import database from "../../firebase/firebase";

export const GAME_CREATE = "GAME_CREATE";
export const GAME_CREATE_FAILED = "GAME_CREATE_FAILED";
export const GAME_UPDATE = "GAME_UPDATE";
export const GAME_UPDATE_FAILED = "GAME_UPDATE_FAILED";
export const GAME_FETCH = "GAME_FETCH";
export const GAME_FETCH_FAILED = "GAME_FETCH_FAILED";
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

export const createGame =
  ({ userEmail, email }) =>
  async (dispatch) => {
    const dummyGameType = 0;

    try {
      const newDoc = {
        emails: [userEmail, email],
        participants: [
          {
            email: userEmail,
            hasCompletedFirstTime: false,
            hasCompletedSecondTime: false,
          },
          {
            email: email,
            hasCompletedFirstTime: false,
            hasCompletedSecondTime: false,
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

export const fetchGame =
  ({ id }) =>
  async (dispatch) => {
    try {
      const docRef = doc(database, games, id);
      const docSnap = await getDoc(docRef);

      return dispatch({
        type: GAME_FETCH,
        game: docSnap.data(),
      });
    } catch (error) {
      console.log(error, "error");

      const res = error.response;
      return dispatch({
        type: GAME_FETCH,
        error: res.data[0].code,
      });
    }
  };

export const updateGame =
  ({ game, id }) =>
  async (dispatch) => {
    try {
      await setDoc(doc(database, games, id), game);

      return dispatch({
        type: GAME_UPDATE,
      });
    } catch (error) {
      console.log(error, "error");

      const res = error.response;
      return dispatch({
        type: GAME_UPDATE_FAILED,
        error: res.data[0].code,
      });
    }
  };
