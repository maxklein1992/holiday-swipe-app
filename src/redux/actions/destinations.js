import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  query,
  where,
  getCountFromServer,
  getDocs,
} from "firebase/firestore";

import database from "../../firebase/firebase";
import { destinations } from "../../constants/collections";

export const DESTINATIONS_FETCH = "DESTINATIONS_FETCH";
export const DESTINATIONS_FETCH_FAILED = "DESTINATIONS_FETCH_FAILED";

export const fetchDestinations = (gameType) => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(database, destinations));
    const response = [];
    querySnapshot.forEach((doc) => {
      response.push({
        ...doc.data(),
        key: doc.id,
      });
    });

    return dispatch({
      type: DESTINATIONS_FETCH,
      destinations: response,
    });
  } catch (error) {
    console.log(error);
    const res = error.response;

    return dispatch({
      type: DESTINATIONS_FETCH_FAILED,
      error: res.data[0].code,
    });
  }
};
