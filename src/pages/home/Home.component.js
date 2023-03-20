import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import findIndex from "lodash.findindex";

import * as gamesActions from "../../redux/actions/games";
import styles from "./Home.module.scss";
import {
  login,
  createGame,
  chooseDestinations,
  showResults,
} from "../../constants/paths";
import Button from "../../elements/button";
import { getUserId } from "../../utils/jwt";
import GameCard from "../../components/gameCard";

const Home = ({
  fetchGames,
  isAuthenticated,
  authLoading,
  userInfo,
  games,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetchGames(userInfo.email);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (isAuthenticated === false && authLoading === false) {
    return <Navigate to={login} replace />;
  }

  if (loading) return null;

  return (
    isAuthenticated === true && (
      <div className={styles.component}>
        <div className={styles.welcomeMessageContainer}>
          <h1>Welcome back, {userInfo.full_name}</h1>
        </div>
        <div className={styles.gamesOverviewContainer}>
          <h1 className={styles.newGameHeader}>New travels</h1>
          {games.length === 0 ? (
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
              {games &&
                games.map((game, i) => {
                  const index = findIndex(game.participants, {
                    email: userInfo.email,
                  });
                  const userHasCompleted =
                    game.participants[index].hasCompleted;
                  const opponentHasCompleted =
                    game.participants[index === 0 ? 1 : 0].hasCompleted;

                  const allHaveCompleted =
                    userHasCompleted && opponentHasCompleted;

                  return (
                    <GameCard
                      game={game}
                      userInfo={userInfo}
                      onClick={() =>
                        allHaveCompleted
                          ? navigate(showResults, {
                              replace: true,
                              state: { id: game.id },
                            })
                          : !userHasCompleted
                          ? navigate(chooseDestinations, {
                              replace: true,
                              state: { id: game.id },
                            })
                          : alert(
                              "We are waiting for the other participants to finish"
                            )
                      }
                    />
                  );
                })}
            </div>
          )}
        </div>
        {games.length > 0 && (
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
