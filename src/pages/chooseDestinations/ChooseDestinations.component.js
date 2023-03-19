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

  const [loading, setLoading] = React.useState(true);
  const [destinations, setDestinations] = React.useState(null);
  const [swipeCount, setSwipeCount] = React.useState(0);
  const [choices, setChoices] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetchDestinations();

        if (response && response.destinations) {
          setLoading(false);
          setDestinations(response.destinations);
        }
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
    addChoices({
      choices,
      gameId,
      userId: userInfo.id,
      email: userInfo.email,
    });
    const response = await fetchGame({ id: gameId });
    let game = response.game;

    const index = findIndex(game.participants, {
      email: userInfo.email,
    });
    game.participants[index].hasCompleted = true;
    await updateGame({ game, id: gameId });
    navigate(dashboard, { replace: true });
  };

  if (isAuthenticated === false) {
    return <Navigate to={login} replace />;
  }

  if (loading) return null;

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
          <Button variant="primary" onClick={() => handleSubmit()}>
            Continue
          </Button>
        </>
      )}
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
    addChoices: ({ choices, gameId, userId, email }) =>
      dispatch(choicesActions.addChoices({ choices, gameId, userId, email })),
    fetchDestinations: () => dispatch(destinationsActions.fetchDestinations()),
  })
)(ChooseDestinations);
