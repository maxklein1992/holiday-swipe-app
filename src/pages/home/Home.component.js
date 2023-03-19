import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";

import * as gamesActions from "../../redux/actions/games";
import styles from "./Home.module.scss";
import { login, createGame, chooseDestinations } from "../../constants/paths";
import Button from "../../elements/button";
import { getUserId } from "../../utils/jwt";
import MatchCard from "../../components/matchCard";

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
                onClick={() =>
                  navigate(createGame, {
                    replace: true,
                  })
                }
                variant="primary"
                className={styles.button}
              >
                Find new destination now
              </Button>
            </>
          ) : (
            <div className={styles.gamesContainer}>
              {games.map((game, i) => (
                <MatchCard
                  game={game}
                  userInfo={userInfo}
                  onClick={() =>
                    navigate(chooseDestinations, {
                      replace: true,
                      state: { id: game.id },
                    })
                  }
                />
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
              size="big"
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
    fetchGames: (email) => dispatch(gamesActions.fetchGames(email)),
  })
)(Home);
