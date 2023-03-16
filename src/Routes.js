import React from "react";
import { Router, BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";

import {
  createJourney,
  dashboard,
  login,
  inviteFriend,
} from "./constants/paths";
import * as userActions from "./redux/actions/user";
import Home from "./pages/home";
import Login from "./pages/login";
import InviteFriend from "./pages/inviteFriend";
import CreateJourney from "./pages/createJourney";
import { refresh } from "./redux/actions/auth";

const Routing = ({ fetchUserdata, isAuthenticated, authLoading }) => {
  const dispatch = useDispatch();

  const [userInfoLoading, setUserInfoLoading] = React.useState(true);

  React.useEffect(() => {
    if (isAuthenticated)
      (async () => {
        try {
          setUserInfoLoading(true);
          const response = await fetchUserdata();
          if (response && response.personal_data) {
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
        <Route path={createJourney} element={<CreateJourney />} />
        <Route path={inviteFriend} element={<InviteFriend />} />
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
    fetchUserdata: () => dispatch(userActions.fetchUserdata()),
  })
)(Routing);
