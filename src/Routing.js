import React from "react";
import { Router, BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";

import {
  createGame,
  dashboard,
  login,
  inviteFriend,
  chooseDestinations,
} from "./constants/paths";
import * as userActions from "./redux/actions/user";
import Home from "./pages/home";
import Login from "./pages/login";
import InviteFriend from "./pages/inviteFriend";
import ChooseDestinations from "./pages/chooseDestinations";
import CreateGame from "./pages/createGame";
import { refresh } from "./redux/actions/auth";
import { getUserId } from "./utils/jwt";

const Routing = ({ fetchUserdata, isAuthenticated, authLoading }) => {
  const dispatch = useDispatch();

  const [userInfoLoading, setUserInfoLoading] = React.useState(true);

  React.useEffect(() => {
    const userId = getUserId();

    if (isAuthenticated && userId)
      (async () => {
        try {
          const response = await fetchUserdata(userId);
          if (response && response.personal_data && !response.error) {
            setUserInfoLoading(false);
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      })();
  }, [isAuthenticated]);

  React.useEffect(() => {
    dispatch(refresh());
  }, []);

  if (authLoading || (isAuthenticated && userInfoLoading))
    return <BeatLoader color="#367fd6" />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={dashboard} element={<Home />} />
        <Route path={login} element={<Login />} />
        <Route path={createGame} element={<CreateGame />} />
        <Route path={inviteFriend} element={<InviteFriend />} />
        <Route path={chooseDestinations} element={<ChooseDestinations />} />
      </Routes>
    </BrowserRouter>
  );
};

export default connect(
  (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    authLoading: state.auth.loading,
    userInfo: state.user.personal_data,
  }),
  (dispatch) => ({
    fetchUserdata: (userId) => dispatch(userActions.fetchUserdata(userId)),
  })
)(Routing);
