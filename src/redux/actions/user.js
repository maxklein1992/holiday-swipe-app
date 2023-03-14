export const GET_USER_INFO = "GET_USER_INFO";

export const fetchUserdata = () => async (dispatch, store) => {
  const response = {
    data: {
      full_name: "Max Klein",
    },
  };
  return dispatch({
    type: GET_USER_INFO,
    personal_data: response.data,
  });
};
