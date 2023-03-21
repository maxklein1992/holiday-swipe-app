import React from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useNavigate, Navigate, useLocation } from "react-router-dom";

import * as authActions from "../../redux/actions/auth";
import styles from "./ShowResults.module.scss";
import { login, inviteFriend, dashboard } from "../../constants/paths";

const ShowResults = ({ isAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const gameId = location.state.id;
  const participants = location.state.participants;
  console.log(participants, "participant");

  if (isAuthenticated === false) {
    return <Navigate to={login} replace />;
  }

  return (
    <div className={styles.component}>
      <div className={styles.headerContainer}>
        <h1>The outcomes</h1>
        <p>{gameId}</p>
        {participants.map((participant) => (
          <p>{participant.email}</p>
        ))}
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    authLoading: state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated,
  }),
  (dispatch) => ({
    signIn: () => dispatch(authActions.signIn()),
  })
)(ShowResults);
