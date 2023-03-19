import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";

import * as gameActions from "../../redux/actions/games";
import styles from "./InviteFriend.module.scss";
import { login, dashboard } from "../../constants/paths";
import Button from "../../elements/button";
import Input from "../../elements/input";

const InviteFriend = ({ isAuthenticated, createGame, userEmail }) => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");

  console.log(email, "usestate");

  if (isAuthenticated === false) {
    return <Navigate to={login} replace />;
  }

  const onSubmit = async () => {
    const response = await createGame({ userEmail, email });

    if (!response.error) {
      navigate(dashboard, { replace: true });
    }
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
    userEmail: state.user.personal_data.email,
  }),
  (dispatch) => ({
    createGame: (emails) => dispatch(gameActions.createGame(emails)),
  })
)(InviteFriend);
