import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  query,
  where,
  getCountFromServer,
  getDocs,
} from "firebase/firestore";

import database from "../../firebase/firebase";
import {
  choices as choicesCollection,
  games,
} from "../../constants/collections";

export const CHOICES_ADD = "CHOICES_ADD";
export const CHOICES_ADD_FAILED = "CHOICES_ADD_FAILED";

export const addChoices =
  ({ choices, gameId, userId }) =>
  async (dispatch) => {
    try {
      const collectionRef = collection(database, choicesCollection);
      await addDoc(collectionRef, {
        userId,
        choices,
        gameId,
      });

      return dispatch({
        type: CHOICES_ADD,
      });
    } catch (error) {
      console.log(error);
      const res = error.response;

      return dispatch({
        type: CHOICES_ADD_FAILED,
        error: res.data[0].code,
      });
    }
  };
