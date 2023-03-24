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
  finalChoices,
  games,
} from "../../constants/collections";

export const CHOICES_ADD = "CHOICES_ADD";
export const CHOICES_ADD_FAILED = "CHOICES_ADD_FAILED";
export const FINAL_CHOICES_ADD = "FINAL_CHOICES_ADD";
export const FINAL_CHOICES_ADD_FAILED = "FINAL_CHOICES_ADD_FAILED";
export const CHOICES_FETCH = "CHOICES_FETCH";
export const CHOICES_FETCH_FAILED = "CHOICES_FETCH_FAILED";
export const FINAL_CHOICES_FETCH = "FINAL_CHOICES_FETCH";
export const FINAL_CHOICES_FETCH_FAILED = "FINAL_CHOICES_FETCH_FAILED";

export const addChoices =
  ({ choices, gameId, email }) =>
  async (dispatch) => {
    try {
      const collectionRef = collection(database, choicesCollection);
      await addDoc(collectionRef, {
        email,
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

export const addFinalChoices =
  ({ choices, gameId, email }) =>
  async (dispatch) => {
    try {
      const collectionRef = collection(database, finalChoices);
      await addDoc(collectionRef, {
        email,
        choices,
        gameId,
      });

      return dispatch({
        type: FINAL_CHOICES_ADD,
      });
    } catch (error) {
      console.log(error);
      const res = error.response;

      return dispatch({
        type: FINAL_CHOICES_ADD_FAILED,
        error: res.data[0].code,
      });
    }
  };

export const fetchChoices =
  ({ email, gameId }) =>
  async (dispatch) => {
    try {
      const queryResult = query(
        collection(database, choicesCollection),
        where("email", "==", email),
        where("gameId", "==", gameId)
      );

      const response = [];

      const querySnapshot = await getDocs(queryResult);
      querySnapshot.forEach((doc) => {
        response.push(doc.data());
      });

      return dispatch({
        type: CHOICES_FETCH,
        choices: response[0].choices,
      });
    } catch (error) {
      console.log(error, "error");
      const res = error.response;

      return dispatch({
        type: CHOICES_FETCH_FAILED,
        error: res.data[0].code,
      });
    }
  };

export const fetchFinalChoices =
  ({ email, gameId }) =>
  async (dispatch) => {
    try {
      const queryResult = query(
        collection(database, finalChoices),
        where("email", "==", email),
        where("gameId", "==", gameId)
      );

      const response = [];

      const querySnapshot = await getDocs(queryResult);
      querySnapshot.forEach((doc) => {
        response.push(doc.data());
      });

      return dispatch({
        type: FINAL_CHOICES_FETCH,
        choices: response[0].choices,
      });
    } catch (error) {
      console.log(error, "error");
      const res = error.response;

      return dispatch({
        type: FINAL_CHOICES_FETCH_FAILED,
        error: res.data[0].code,
      });
    }
  };
