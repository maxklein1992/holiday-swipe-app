import React from "react";

import styles from "./GameCard.module.scss";

const GameCard = ({ game, userInfo, onClick }) => {
  return (
    <button
      className={styles.component}
      key={`key ${game.id}`}
      onClick={onClick}
    >
      <div className={styles.upperPart}>
        <img
          className={styles.image}
          src="https://cdn-icons-png.flaticon.com/512/197/197615.png"
        />
        <p className={styles.title}>Countries in Europe</p>
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
                participant.hasCompleted && styles.isGreen,
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
