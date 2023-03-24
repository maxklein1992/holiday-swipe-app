import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import findIndex from "lodash.findindex";

import * as gamesActions from "../../redux/actions/games";
import * as feedbackActions from "../../redux/actions/feedback";
import styles from "./Home.module.scss";
import {
  login,
  createGame,
  chooseDestinations,
  showResults,
  showWinner,
} from "../../constants/paths";
import Button from "../../elements/button";
import { getUserId } from "../../utils/jwt";
import GameCard from "../../components/gameCard";
import Input from "../../elements/input";

const Home = ({
  fetchGames,
  addFeedback,
  isAuthenticated,
  authLoading,
  userInfo,
  games,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(true);
  const [feedbackIsSubmitting, setFeedbackIsSubmitting] = React.useState(false);
  const [feedback, setFeedback] = React.useState("");

  const getStatusGame = ({ user, opponent }) => {
    if (user.hasCompletedSecondTime && opponent.hasCompletedSecondTime)
      return "finished";
    if (user.hasCompletedSecondTime) return "opponent_second";
    if (opponent.hasCompletedSecondTime) return "user_second";
    if (user.hasCompletedFirstTime && opponent.hasCompletedFirstTime)
      return "both_second";
    if (user.hasCompletedFirstTime) return "opponent_first";
    if (opponent.hasCompletedFirstTime) return "user_first";
    return "both_first";
  };

  const submitFeedback = async ({ feedback, name }) => {
    setFeedbackIsSubmitting(true);
    const response = await addFeedback({ feedback, name });
    if (response) {
      setFeedback("");
      setFeedbackIsSubmitting(false);
      alert("Feedback has been received by Max");
    }
  };

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
                  if (index === -1) {
                    console.log("Error: no match found");
                    return null;
                  }

                  const gameStatus = getStatusGame({
                    user: game.participants[index],
                    opponent: game.participants[index === 0 ? 1 : 0],
                  });

                  return (
                    <GameCard
                      key={`key ${game.id}`}
                      game={game}
                      userInfo={userInfo}
                      gameStatus={gameStatus}
                      onClick={() =>
                        gameStatus === "finished"
                          ? navigate(showWinner, {
                              state: {
                                id: game.id,
                                participants: game.participants,
                              },
                            })
                          : gameStatus === "both_second" ||
                            gameStatus === "user_second"
                          ? navigate(showResults, {
                              state: {
                                id: game.id,
                                participants: game.participants,
                              },
                            })
                          : gameStatus === "both_first" ||
                            gameStatus === "user_first"
                          ? navigate(chooseDestinations, {
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
        <div className={styles.feedbackContainer}>
          <p className={styles.feedbackTitle}>Feedback</p>
          <p className={styles.feedbackExplanation}>Please let me know:</p>
          <Input
            className={styles.input}
            placeholder="what do you like and what do you miss?"
            value={feedback}
            name="feedback"
            onChange={(value) => setFeedback(value)}
          />
          <Button
            onClick={() =>
              submitFeedback({ feedback, name: userInfo.full_name })
            }
            variant="primary"
            disabled={!feedback}
            size="big"
            loading={feedbackIsSubmitting}
          >
            Send
          </Button>
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
    games: state.games.games,
  }),
  (dispatch) => ({
    addFeedback: ({ feedback, name }) =>
      dispatch(feedbackActions.addFeedback({ feedback, name })),
    fetchGames: (email) => dispatch(gamesActions.fetchGames(email)),
  })
)(Home);
