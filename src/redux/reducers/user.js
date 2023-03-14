import { GET_USER_INFO } from "../actions/user";

const initialState = {
  personal_data: {
    email: null,
    full_name: null,
  },
};

const User = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...state,
        personal_data: action.personal_data,
      };
    default:
      return state;
  }
};

export default User;
