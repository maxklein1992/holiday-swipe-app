import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  query,
  where,
  getCountFromServer,
} from "firebase/firestore";

import { clear, getUserId, saveToStorage } from "../../utils/jwt";
import database from "../../firebase/firebase";

export const AUTH_CONNECTING = "AUTH_CONNECTING";
export const AUTH_LOGGED_FAILED = "AUTH_LOGGED_FAILED";
export const AUTH_LOGGED_IN = "AUTH_LOGGED_IN";
export const AUTH_LOGGED_OUT = "AUTH_LOGGED_OUT";

export const refresh = () => {
  const userId = getUserId();

  if (userId) {
    return {
      type: AUTH_LOGGED_IN,
    };
  }

  return {
    type: AUTH_LOGGED_FAILED,
  };
};

export const signOut = () => {
  clear();

  return {
    type: AUTH_LOGGED_OUT,
  };
};

export const signIn = () => async (dispatch) => {
  dispatch({
    type: AUTH_CONNECTING,
  });

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  try {
    const result = await signInWithPopup(auth, provider);

    const { uid, email, displayName } = result.user;

    const userInfo = {
      id: uid,
      email,
      full_name: displayName,
    };

    saveToStorage("userId", userInfo.id);
    saveToStorage("full_name", userInfo.full_name);

    const collectionRef = collection(database, "users");
    const response = query(collectionRef, where("id", "==", userInfo.id));
    const snapshot = await getCountFromServer(response);

    const userCount = snapshot._data.value.mapValue.fields.count.integerValue;

    if (userCount == 0) {
      await setDoc(doc(database, "users", userInfo.id), {
        id: userInfo.id,
        email: userInfo.email,
        full_name: userInfo.full_name,
      });
    }

    return dispatch({
      type: AUTH_LOGGED_IN,
    });
  } catch (error) {
    console.log(error, "error");
    return dispatch({
      type: AUTH_LOGGED_FAILED,
    });
  }
};
