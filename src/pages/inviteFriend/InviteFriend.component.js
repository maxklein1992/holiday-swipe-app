import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";

import * as gameActions from "../../redux/actions/game";
import styles from "./InviteFriend.module.scss";
import { login, dashboard } from "../../constants/paths";
import Button from "../../elements/button";
import Input from "../../elements/input";

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
        <h1>Invite your travel buddy</h1>
      </div>
      <Input
        className={styles.input}
        name="email"
        value={email}
        placeholder="Email address"
        onChange={(value) => setEmail(value)}
      />
      <Button
        onClick={() => onSubmit()}
        variant="primary"
        disabled={!email}
        size="big"
      >
        Confirm
      </Button>
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
