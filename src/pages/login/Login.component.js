import React from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { dashboard } from "../../constants/paths";
import JourneyCard from "../../components/journeyCard";
import { inviteFriend } from "../../constants/paths";
import styles from "./Login.module.scss";
import { signIn } from "../../redux/actions/auth";
import * as authActions from "../../redux/actions/auth";

const Login = ({ signIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  React.useEffect(() => {
    if (isAuthenticated) navigate(dashboard);
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
          <JourneyCard
            image="https://cdn-icons-png.flaticon.com/512/1795/1795606.png"
            title="Places in Portugal"
            disabled
          />
          <JourneyCard
            image="https://cdn-icons-png.flaticon.com/512/197/197615.png"
            title="Countries in Europe"
            disabled
          />
          <JourneyCard
            image="https://d35aaqx5ub95lt.cloudfront.net/images/userMotivationSurvey/fbcf7ddad59a2c199b2e5e0b5dc4f601.svg"
            title="Countries Worldwide"
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({}),
  (dispatch) => ({
    signIn: () => dispatch(authActions.signIn()),
  })
)(Login);
