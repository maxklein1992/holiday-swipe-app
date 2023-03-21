import React from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import findIndex from "lodash.findindex";

import * as authActions from "../../redux/actions/auth";
import * as choicesActions from "../../redux/actions/choices";
import styles from "./ShowResults.module.scss";
import { login, inviteFriend, dashboard } from "../../constants/paths";

const ShowResults = ({ isAuthenticated, fetchChoices, userInfo }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const gameId = location.state.id;
  const participants = location.state.participants;
  const [loading, setLoading] = React.useState(true);
  const [bothLiked, setBothLiked] = React.useState([]);

  const index = findIndex(participants, {
    email: userInfo.email,
  });

  console.log(participants, "participant");

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

        console.log(opponentChoices, userChoices, "liked");

        const bothLiked = userChoices.filter((o1) =>
          opponentChoices.some(
            (o2) => o1.key === o2.key && o1.liked && o2.liked
          )
        );

        setBothLiked(bothLiked);

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

  if (loading) return null;

  return (
    <div className={styles.component}>
      <div className={styles.headerContainer}>
        <h1>The outcomes</h1>
        {bothLiked && bothLiked.map((destination) => <p>{destination.name}</p>)}
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
    fetchChoices: ({ email, gameId }) =>
      dispatch(choicesActions.fetchChoices({ email, gameId })),
    signIn: () => dispatch(authActions.signIn()),
  })
)(ShowResults);
