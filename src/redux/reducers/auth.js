import {
  AUTH_CONNECTING,
  AUTH_LOGGED_FAILED,
  AUTH_LOGGED_IN,
  AUTH_LOGGED_OUT,
} from "../actions/auth";

const initialState = {
  isAuthenticated: null,
  loading: true,
};

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_CONNECTING:
      return {
        ...state,
        loading: true,
      };
    case AUTH_LOGGED_IN:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_LOGGED_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    case AUTH_LOGGED_OUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return { ...state };
  }
};

export default Auth;
