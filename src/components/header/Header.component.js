import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import * as authActions from "../../redux/actions/auth";
import styles from "./Header.module.scss";

const Header = ({ signOut, signIn, isAuthenticated, userInfo }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.component}>
      <h1 className={styles.logo}>Holiday Swipe</h1>
      {!isAuthenticated && (
        <div className={styles.loginContainer}>
          <button
            className={styles.loginButton}
            onClick={() => dispatch(signIn())}
          >
            Log in
          </button>
        </div>
      )}
      {isAuthenticated && userInfo && (
        <div className={styles.logoutContainer}>
          <p className={styles.userName}>{userInfo.full_name}</p>
          <button
            className={styles.logoutButton}
            onClick={() => dispatch(signOut())}
          >
            Sign out
          </button>
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
