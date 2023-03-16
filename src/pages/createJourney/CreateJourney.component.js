import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";

import styles from "./CreateJourney.module.scss";
import { login, inviteFriend } from "../../constants/paths";

const CreateJourney = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  if (isAuthenticated === false) {
    return <Navigate to={login} replace />;
  }

  return (
    <div className={styles.component}>
      <div className={styles.headerContainer}>
        <h1>Select your type of journey...</h1>
      </div>
      <div className={styles.journeyTypesContainer}>
        <button
          className={styles.journeyTypeContainer}
          onClick={() => navigate(inviteFriend, { replace: true })}
        >
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src="https://cdn-icons-png.flaticon.com/512/1795/1795606.png"
            />
          </div>
          <p className={styles.journeyTypeTitle}>Places in Portugal</p>
        </button>
        {/* <button className={styles.journeyTypeContainer}>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src="https://cdn-icons-png.flaticon.com/512/197/197615.png"
            />
          </div>
          <p className={styles.journeyTypeTitle}>Countries in Europe</p>
        </button>
        <button className={styles.journeyTypeContainer}>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src="https://d35aaqx5ub95lt.cloudfront.net/images/userMotivationSurvey/fbcf7ddad59a2c199b2e5e0b5dc4f601.svg"
            />
          </div>
          <p className={styles.journeyTypeTitle}>Countries Worldwide</p>
        </button> */}
      </div>
    </div>
  );
};

export default connect((state) => ({
  isAuthenticated: state.auth.isAuthenticated,
}))(CreateJourney);
