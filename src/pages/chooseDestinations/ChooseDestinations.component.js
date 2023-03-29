import React from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import findIndex from "lodash.findindex";

import * as destinationsActions from "../../redux/actions/destinations";
import * as choicesActions from "../../redux/actions/choices";
import * as gamesActions from "../../redux/actions/games";
import { login, inviteFriend, dashboard } from "../../constants/paths";
import styles from "./ChooseDestinations.module.scss";
import DestinationCard from "../../components/destinationCard";
import Button from "../../elements/button";
import FeedbackWidget from "../../components/feedbackWidget";
import {
  spanishPlaces,
  portuguesePlaces,
  italianPlaces,
  europeanCountries,
  worldCountries,
} from "../../constants/destinations";

const ChooseDestinations = ({
  addChoices,
  fetchGame,
  updateGame,
  fetchDestinations,
  isAuthenticated,
  userInfo,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const gameId = location.state.id;
  const gameType = location.state.gameType;

  const [loading, setLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [destinations, setDestinations] = React.useState(null);
  const [swipeCount, setSwipeCount] = React.useState(0);
  const [choices, setChoices] = React.useState([]);

  // React.useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await fetchDestinations();

  //       if (response && response.destinations) {
  //         setLoading(false);
  //         setDestinations(response.destinations);
  //       }
  //     } catch (error) {
  //       // eslint-disable-next-line no-console
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(false);
        setDestinations(
          gameType === "portugal"
            ? portuguesePlaces
            : gameType === "spain"
            ? spanishPlaces
            : gameType === "italy"
            ? italianPlaces
            : gameType === "world"
            ? worldCountries
            : gameType === "europe" && europeanCountries
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    })();
  }, []);

  const onSwipe = (direction, destination) => {
    const liked = direction === "right" ? true : false;
    setChoices([
      ...choices,
      { key: destination.key, name: destination.name, liked: liked },
    ]);
    setSwipeCount(swipeCount + 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await addChoices({
      choices,
      gameId,
      email: userInfo.email,
    });
    const response = await fetchGame({ id: gameId });
    let game = response.game;

    const index = findIndex(game.participants, {
      email: userInfo.email,
    });
    game.participants[index].hasCompletedFirstTime = true;
    await updateGame({ game, id: gameId });
    setIsSubmitting(false);
    navigate(dashboard);
  };

  if (isAuthenticated === false) {
    return <Navigate to={login} replace />;
  }

  //if (loading) return null;

  return (
    <div className={styles.component}>
      {destinations && destinations.length !== swipeCount ? (
        <>
          <DestinationCard
            name={destinations[swipeCount].name}
            image={destinations[swipeCount].url}
          />
          <p
            className={styles.swipeCountTitle}
          >{`${swipeCount}/${destinations.length}`}</p>
          <div className={styles.buttonContainer}>
            <Button
              className={styles.dislikeButton}
              variant="secondary"
              onClick={() => onSwipe("left", destinations[swipeCount])}
            >
              Dislike
            </Button>
            <Button
              className={styles.likeButton}
              variant="primary"
              onClick={() => onSwipe("right", destinations[swipeCount])}
            >
              Like
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className={styles.finishedTitle}>You are done swiping</p>
          <Button
            variant="primary"
            onClick={() => handleSubmit()}
            loading={isSubmitting}
            size="big"
          >
            Continue
          </Button>
        </>
      )}
      <FeedbackWidget className={styles.feedbackWidget} />
    </div>
  );
};

export default connect(
  (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    authLoading: state.auth.loading,
    userInfo: state.user.personal_data,
  }),
  (dispatch) => ({
    updateGame: ({ game, id }) =>
      dispatch(gamesActions.updateGame({ game, id })),
    fetchGame: ({ id }) => dispatch(gamesActions.fetchGame({ id })),
    addChoices: ({ choices, gameId, email }) =>
      dispatch(choicesActions.addChoices({ choices, gameId, email })),
    //fetchDestinations: () => dispatch(destinationsActions.fetchDestinations()),
  })
)(ChooseDestinations);
