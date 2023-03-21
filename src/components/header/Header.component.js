import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { dashboard, login } from "../../constants/paths";
import Button from "../../elements/button";
import * as authActions from "../../redux/actions/auth";
import styles from "./Header.module.scss";

const Header = ({ signOut, signIn, isAuthenticated, userInfo }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.component}>
      <Link className={styles.logo} to={isAuthenticated ? dashboard : login}>
        Holiday Swipe
      </Link>
      {!isAuthenticated && (
        <div className={styles.loginContainer}>
          <Button onClick={() => dispatch(signIn())} variant="primary-inverted">
            Sign up / Log in
          </Button>
        </div>
      )}
      {isAuthenticated && userInfo && (
        <div className={styles.logoutContainer}>
          <p className={styles.userName}>{userInfo.full_name}</p>
          <Button onClick={() => dispatch(signOut())} variant="primary">
            Log out
          </Button>
        </div>
      )}
    </div>
  );
};

export default connect(
  (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    userInfo: state.user.personal_data,
  }),
  (dispatch) => ({
    signOut: () => dispatch(authActions.signOut()),
    signIn: () => dispatch(authActions.signIn()),
  })
)(Header);
