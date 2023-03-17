import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";

import styles from "./CreateGame.module.scss";
import { login, inviteFriend } from "../../constants/paths";
import JourneyCard from "../../components/journeyCard";

const CreateGame = ({ isAuthenticated }) => {
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
        <JourneyCard
          image="https://cdn-icons-png.flaticon.com/512/1795/1795606.png"
          onClick={() => navigate(inviteFriend, { replace: true })}
          title="Places in Portugal"
        />
        {/* <JourneyCard
          image="https://cdn-icons-png.flaticon.com/512/197/197615.png"
          onClick={() => navigate(inviteFriend, { replace: true })}
          title="Countries in Europe"
        />
        <JourneyCard
          image="https://d35aaqx5ub95lt.cloudfront.net/images/userMotivationSurvey/fbcf7ddad59a2c199b2e5e0b5dc4f601.svg"
          onClick={() => navigate(inviteFriend, { replace: true })}
          title="Countries Worldwide"
        /> */}
      </div>
    </div>
  );
};

export default connect((state) => ({
  isAuthenticated: state.auth.isAuthenticated,
}))(CreateGame);
