import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getCountFromServer,
} from "firebase/firestore";

import { clear, getUserId, saveToStorage } from "../../utils/jwt";
import database from "../../firebase/firebase";
import { users } from "../../constants/collections";

export const USER_INFO_FETCH = "USER_INFO_FETCH";
export const USER_INFO_FETCH_FAILED = "USER_INFO_FETCH_FAILED";

export const fetchUserdata = (userId) => async (dispatch) => {
  const docRef = doc(database, users, userId);

  try {
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();

    return dispatch({
      type: USER_INFO_FETCH,
      personal_data: result,
    });
  } catch (error) {
    console.log(error);
    const res = error.response;

    return dispatch({
      type: USER_INFO_FETCH_FAILED,
      error: res.data[0].code,
    });
  }
};
