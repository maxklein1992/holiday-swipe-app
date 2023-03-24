import React from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import findIndex from "lodash.findindex";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import * as authActions from "../../redux/actions/auth";
import * as gamesActions from "../../redux/actions/games";
import * as choicesActions from "../../redux/actions/choices";
import styles from "./ShowResults.module.scss";
import { login, inviteFriend, dashboard } from "../../constants/paths";
import { reorder } from "../../utils/array";
import Button from "../../elements/button";
import FeedbackWidget from "../../components/feedbackWidget";

const ShowResults = ({
  isAuthenticated,
  fetchChoices,
  userInfo,
  fetchGame,
  addFinalChoices,
  updateGame,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const gameId = location.state.id;
  const participants = location.state.participants;
  const [loading, setLoading] = React.useState(true);
  const [prioritizedList, setPrioritizedList] = React.useState(null);

  const index = findIndex(participants, {
    email: userInfo.email,
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;

    const newList = reorder({
      list: Array.from(prioritizedList),
      startIndex: source.index,
      endIndex: destination.index,
    });

    setPrioritizedList(newList);
  };

  const addPoints = async (list) => {
    let result = list;
    result.slice(0, 5);
    result = result.map((destination, i) => {
      return { ...destination, points: i < 5 ? (5 - i) * 10 : 0 };
    });
    return result;
  };

  const submitList = async () => {
    setLoading(true);
    let newList = prioritizedList.map((destination) => {
      return {
        key: destination.key,
        name: destination.name,
      };
    });
    const result = await addPoints(newList);
    await addFinalChoices({
      choices: result,
      gameId,
      email: userInfo.email,
    });
    const response = await fetchGame({ id: gameId });
    let game = response.game;

    const index = findIndex(game.participants, {
      email: userInfo.email,
    });
    game.participants[index].hasCompletedSecondTime = true;
    await updateGame({ game, id: gameId });
    setLoading(false);
    navigate(dashboard);
  };

  React.useEffect(() => {
    (async () => {
      try {
        const userResponse = await fetchChoices({
          email: participants[index].email,
          gameId,
        });

        const userChoices = userResponse.choices;

        const opponentResponse = await fetchChoices({
          email: participants[index === 1 ? 0 : 1].email,
          gameId,
        });

        const opponentChoices = opponentResponse.choices;

        const bothLiked = userChoices.filter((userChoice) =>
          opponentChoices.some(
            (opponentChoice) =>
              userChoice.key === opponentChoice.key &&
              userChoice.liked &&
              opponentChoice.liked
          )
        );

        setPrioritizedList(bothLiked);

        if (userChoices && opponentChoices) {
          setLoading(false);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    })();
  }, [userInfo]);

  if (isAuthenticated === false) {
    return <Navigate to={login} replace />;
  }

  return (
    <div className={styles.component}>
      <div className={styles.headerContainer}>
        <h1>The outcomes</h1>
        <p className={styles.subTitle}>
          These are all the destinations you both liked. Select now your top 5
          to find a winner. Click on 'Confirm' when you are done with your
          selection.
        </p>
        <div className={styles.destinationsOverview}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="choices">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={styles.destinationslist}
                >
                  {prioritizedList &&
                    prioritizedList.map((destination, index) => {
                      return (
                        <Draggable
                          key={destination.key}
                          draggableId={destination.key}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={[
                                styles.destinationContainer,
                                index >= 5 && styles.isGray,
                              ].join(" ")}
                            >
                              <span>{destination.name}</span>
                              {index < 5 && (
                                <>
                                  <span className={styles.ranking}>
                                    {index + 1}
                                  </span>
                                  <span className={styles.points}>
                                    {`${(5 - index) * 10} points`}
                                  </span>
                                </>
                              )}
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
          <div className={styles.buttonContainer}>
            <Button
              variant="primary"
              onClick={() => submitList()}
              loading={loading}
            >
              Confirm
            </Button>
          </div>
        </div>
        <FeedbackWidget className={styles.feedbackWidget} />
      </div>
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
    addFinalChoices: ({ choices, gameId, email }) =>
      dispatch(choicesActions.addFinalChoices({ choices, gameId, email })),
    updateGame: ({ game, id }) =>
      dispatch(gamesActions.updateGame({ game, id })),
    fetchGame: ({ id }) => dispatch(gamesActions.fetchGame({ id })),
    fetchChoices: ({ email, gameId }) =>
      dispatch(choicesActions.fetchChoices({ email, gameId })),
    signIn: () => dispatch(authActions.signIn()),
  })
)(ShowResults);
