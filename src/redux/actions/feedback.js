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

export const FEEDBACK_CREATE = "GAME_CREATE";
export const FEEDBACK_CREATE_FAILED = "GAME_CREATE_FAILED";

export const addFeedback =
  ({ feedback, name }) =>
  async (dispatch) => {
    try {
      await addDoc(collection(database, "feedback"), { feedback, name });

      return dispatch({
        type: FEEDBACK_CREATE,
      });
    } catch (error) {
      console.log(error, "error");

      const res = error.response;
      return dispatch({
        type: FEEDBACK_CREATE_FAILED,
        error: res.data[0].code,
      });
    }
  };
