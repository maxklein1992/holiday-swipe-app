import React from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { dashboard } from "../../constants/paths";
import JourneyCard from "../../components/journeyCard";
import styles from "./Login.module.scss";
import * as authActions from "../../redux/actions/auth";
import GameTypes from "../../constants/gameTypes";

const Login = ({ isAuthenticated, authLoading }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated && authLoading === false) navigate(dashboard);
  }, [isAuthenticated]);

  return (
    <div className={styles.component}>
      <div className={styles.headerComponent}>
        <h1 className={styles.headerTitle}>
          Find your next holiday destination
        </h1>
        <h1 className={styles.subTitle}>
          By swiping through holiday locations with your partner, friend or
          family member
        </h1>
      </div>
      <div className={styles.journeyTypesComponent}>
        <h1 className={styles.journeyTypesTitle}>
          Choose your type of holiday
        </h1>
        <div className={styles.journeyTypesList}>
          {GameTypes.map((type) => (
            <JourneyCard
              key={`card ${type.title}`}
              image={type.url}
              title={type.title}
              disabled
            />
          ))}
        </div>
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
)(Login);
