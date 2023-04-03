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
import { subscribe } from "../../constants/collections";

import database from "../../firebase/firebase";

export const SUBSCRIBE_CREATE = "SUBSCRIBE_CREATE";
export const SUBSCRIBE_CREATE_FAILED = "SUBSCRIBE_CREATE_FAILED";

export const addEmail =
  ({ email }) =>
  async (dispatch) => {
    try {
      await addDoc(collection(database, "subscribe"), { email });

      return dispatch({
        type: SUBSCRIBE_CREATE,
      });
    } catch (error) {
      console.log(error, "error");

      const res = error.response;
      return dispatch({
        type: SUBSCRIBE_CREATE_FAILED,
        error: res.data[0].code,
      });
    }
  };
