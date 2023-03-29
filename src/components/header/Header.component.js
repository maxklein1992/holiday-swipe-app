import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { dashboard, login } from "../../constants/paths";
import Button from "../../elements/button";
import * as authActions from "../../redux/actions/auth";
import styles from "./Header.module.scss";

const Header = ({
  signOut,
  signIn,
  isAuthenticated,
  userInfo,
  transparent,
}) => {
  return (
    <div
      className={[styles.component, transparent && styles.isTransparent].join(
        " "
      )}
    >
      <div className={styles.contentContainer}>
        <div className={styles.logoContainer}>
          <Link
            className={styles.logo}
            to={isAuthenticated ? dashboard : login}
          >
            holiday swipe
          </Link>
          <p
            className={[
              styles.logoSubTitle,
              !transparent && styles.isWhite,
            ].join(" ")}
          >
            A new way to travel
          </p>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.buttonsContainer}>
            {!isAuthenticated ? (
              <>
                <Button variant="primary-inverted" onClick={() => signIn()}>
                  Log In
                </Button>
                <Button variant="primary">Find Your Holiday</Button>
              </>
            ) : (
              userInfo && (
                <>
                  <p className={styles.userName}>{userInfo.full_name}</p>
                  <Button onClick={() => signOut()} variant="primary-inverted">
                    Log out
                  </Button>
                </>
              )
            )}
          </div>
        </div>
      </div>
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
