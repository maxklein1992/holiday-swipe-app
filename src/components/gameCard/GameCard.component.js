import React from "react";
import findIndex from "lodash.findindex";

import styles from "./GameCard.module.scss";

const GameCard = ({ game, userInfo, onClick }) => {
  const index = findIndex(game.participants, {
    email: userInfo.email,
  });
  const userHasCompleted = game.participants[index].hasCompleted;
  const opponentHasCompleted =
    game.participants[index === 0 ? 1 : 0].hasCompleted;

  const allHaveCompleted = userHasCompleted && opponentHasCompleted;

  return (
    <button
      className={[styles.component, allHaveCompleted && styles.isGreen].join(
        " "
      )}
      onClick={onClick}
    >
      <div className={styles.upperPart}>
        <img
          className={styles.image}
          src="https://cdn-icons-png.flaticon.com/512/197/197615.png"
        />
        <p
          className={[styles.title, allHaveCompleted && styles.isBlack].join(
            " "
          )}
        >
          {allHaveCompleted ? "Click to see results" : "Countries in Europe"}
        </p>
      </div>
      <div className={styles.lowerPart}>
        {game.participants.map((participant) => (
          <div
            className={styles.participantContainer}
            key={`key ${participant.email}`}
          >
            <p className={styles.participantTitle}>
              {participant.email === userInfo.email ? "you" : participant.email}
            </p>
            <p
              className={[
                styles.participantAction,
                allHaveCompleted
                  ? styles.isWhite
                  : participant.hasCompleted && styles.isGreen,
              ].join(" ")}
            >
              {participant.hasCompleted ? "swiped" : "not yet swiped"}
            </p>
          </div>
        ))}
      </div>
    </button>
  );
};

export default GameCard;
