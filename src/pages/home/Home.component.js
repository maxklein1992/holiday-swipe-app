import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";

import * as userActions from "../../redux/actions/user";
import styles from "./Home.module.scss";

const Home = ({
  signOut,
  fetchUserdata,
  isAuthenticated,
  authLoading,
  userInfo,
}) => {
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

  if (isAuthenticated === false && authLoading === false) {
    return <Navigate to="/login" replace />;
  }

  if (authLoading || userInfoLoading) return <BeatLoader color="#367fd6" />;

  return (
    isAuthenticated === true && (
      <div className={styles.component}>
        <div className={styles.welcomeMessageContainer}>
          <h1>Welcome back, {userInfo.full_name}</h1>
        </div>
        <div className={styles.swipeOverviewContainer}>
          <h1 className={styles.swipeOverviewHeader}>New travels</h1>
          <p>You have not yet swiped through destinations yet! </p>
          <button className={styles.newSwipeButton}>
            Find new destination now
          </button>
        </div>
      </div>
    )
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
)(Home);
