import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";

import styles from "./CreateGame.module.scss";
import { login, inviteFriend } from "../../constants/paths";
import JourneyCard from "../../components/journeyCard";
import GameTypes from "../../constants/gameTypes";

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
        {GameTypes.map(
          (type) =>
            type.available && (
              <JourneyCard
                key={`card ${type.title}`}
                image={type.url}
                title={type.title}
                onClick={() => navigate(inviteFriend, { replace: true })}
              />
            )
        )}
      </div>
    </div>
  );
};

export default connect((state) => ({
  isAuthenticated: state.auth.isAuthenticated,
}))(CreateGame);
