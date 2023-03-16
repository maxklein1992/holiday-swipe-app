import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";

import * as gameActions from "../../redux/actions/game";
import styles from "./InviteFriend.module.scss";
import { login, dashboard } from "../../constants/paths";

const InviteFriend = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");

  if (isAuthenticated === false) {
    return <Navigate to={login} replace />;
  }

  const onSubmit = () => {
    //
    navigate(dashboard, { replace: true });
  };

  return (
    <div className={styles.component}>
      <div className={styles.headerContainer}>
        <h1>Invite your friend</h1>
      </div>
      <input
        className={styles.input}
        type="text"
        name="email"
        value={email}
        placeholder="Email address"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className={[styles.button, !email && styles.disabled].join(" ")}
        onClick={() => onSubmit()}
        disabled={!email}
      >
        Confirm
      </button>
    </div>
  );
};

export default connect(
  (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  }),
  (dispatch) => ({
    createGame: (email) => dispatch(gameActions.createGame(email)),
  })
)(InviteFriend);
