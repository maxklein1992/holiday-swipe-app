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

  console.log(games, "games");

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
            <>
              {Object.keys(games).map((game, i) => (
                <p>
                  {games[i].emails[0]} and {games[i].emails[1]}
                </p>
              ))}
            </>
          )}
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
    games: state.games,
  }),
  (dispatch) => ({
    fetchGames: (email) => dispatch(gameActions.fetchGames(email)),
  })
)(Home);
