import React from "react";
import { connect } from "react-redux";
import findIndex from "lodash.findindex";
import { useNavigate, Navigate, useLocation } from "react-router-dom";

import * as choicesActions from "../../redux/actions/choices";
import styles from "./ShowWinner.module.scss";
import { sort } from "../../utils/array";
import FeedbackWidget from "../../components/feedbackWidget";

const ShowWinner = ({ fetchFinalChoices, userInfo }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const gameId = location.state.id;
  const participants = location.state.participants;

  const index = findIndex(participants, {
    email: userInfo.email,
  });

  const [winners, setWinners] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        const userResponse = await fetchFinalChoices({
          email: participants[index].email,
          gameId,
        });

        const userChoices = userResponse.choices;

        const opponentResponse = await fetchFinalChoices({
          email: participants[index === 1 ? 0 : 1].email,
          gameId,
        });

        const opponentChoices = opponentResponse.choices;

        const mergedArray = userChoices.map((user) => {
          const opponent = opponentChoices.find(
            (opponent) => opponent.key === user.key
          );
          const pointsCombined = user.points + opponent.points;
          return { key: user.key, name: user.name, points: pointsCombined };
        });

        const sortedArray = sort({ list: mergedArray, property: "points" });

        setWinners(sortedArray);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    })();
  }, [userInfo]);

  return (
    <div className={styles.component}>
      <h2>You have both voted. Below you see the winners! Enjoy your trip!</h2>
      <div className={styles.destinationsOverview}>
        {winners &&
          winners.map((destination, index) => (
            <div className={styles.destinationContainer}>
              <p className={styles.destinationTitle}>{destination.name}</p>
              <div
                className={[
                  styles.bottomContainer,
                  index >= 3 && styles.isFlexEnd,
                ].join(" ")}
              >
                {index < 3 && (
                  <p className={styles.destinationSubtitle}>
                    {index === 0
                      ? "Winner"
                      : index === 1
                      ? "2nd place"
                      : "3rd place"}
                  </p>
                )}
                <p
                  className={styles.points}
                >{`${destination.points} points`}</p>
              </div>
            </div>
          ))}
      </div>
      <FeedbackWidget className={styles.feedbackWidget} />
    </div>
  );
};

export default connect(
  (state) => ({
    authLoading: state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated,
    userInfo: state.user.personal_data,
  }),
  (dispatch) => ({
    fetchFinalChoices: ({ email, gameId }) =>
      dispatch(choicesActions.fetchFinalChoices({ email, gameId })),
  })
)(ShowWinner);
