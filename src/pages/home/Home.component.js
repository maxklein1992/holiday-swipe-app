import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";

import * as gameActions from "../../redux/actions/games";
import styles from "./Home.module.scss";
import { login, createGame } from "../../constants/paths";
import Button from "../../elements/button";
import { getUserId } from "../../utils/jwt";

const Home = ({
  fetchGames,
  isAuthenticated,
  authLoading,
  userInfo,
  games,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetchGames(userInfo.email);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    })();
  }, []);

  if (isAuthenticated === false && authLoading === false) {
    return <Navigate to={login} replace />;
  }

  return (
    isAuthenticated === true && (
      <div className={styles.component}>
        <div className={styles.welcomeMessageContainer}>
          <h1>Welcome back, {userInfo.full_name}</h1>
        </div>
        <div className={styles.gamesOverviewContainer}>
          <h1 className={styles.newGameHeader}>New travels</h1>
          {!games ? (
            <>
              <p>You have not yet swiped through destinations yet! </p>
              <Button
                onClick={() => navigate(createGame, { replace: true })}
                variant="primary"
                className={styles.button}
              >
                Find new destination now
              </Button>
            </>
          ) : (
            <div className={styles.gamesContainer}>
              {games.map((game, i) => (
                <div className={styles.match} key={`key ${game.id}`}>
                  <div className={styles.upperPart}>
                    <img
                      className={styles.image}
                      src="https://cdn-icons-png.flaticon.com/512/1795/1795606.png"
                    />
                    <p className={styles.matchTitle}>Portuguese places</p>
                  </div>
                  <div className={styles.lowerPart}>
                    {game.participants.map((participant) => (
                      <div
                        className={styles.participantContainer}
                        key={`key ${participant.email}`}
                      >
                        <p className={styles.participantTitle}>
                          {participant.email === userInfo.email
                            ? "you"
                            : participant.email}
                        </p>
                        <p
                          className={[
                            styles.participantAction,
                            participant.hasCompleted && styles.isGreen,
                          ].join(" ")}
                        >
                          {participant.hasCompleted
                            ? "swiped"
                            : "not yet swiped"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {games && (
          <div className={styles.startNewGameContainer}>
            <h1 className={styles.newGameHeader}>Start new travel</h1>
            <Button
              onClick={() => navigate(createGame, { replace: true })}
              variant="primary"
              className={styles.button}
            >
              Find new destination now
            </Button>
          </div>
        )}
      </div>
    )
  );
};

export default connect(
  (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    authLoading: state.auth.loading,
    userInfo: state.user.personal_data,
    games: state.games.games,
  }),
  (dispatch) => ({
    fetchGames: (email) => dispatch(gameActions.fetchGames(email)),
  })
)(Home);
