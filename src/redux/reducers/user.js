import { USER_INFO_FETCH } from "../actions/user";

const initialState = {
  personal_data: {
    email: null,
    full_name: null,
  },
};

const User = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO_FETCH:
      return {
        ...state,
        personal_data: action.personal_data,
      };
    default:
      return state;
  }
};

export default User;
