import React from "react";

import styles from "./MatchCard.module.scss";

const MatchCard = ({ game, userInfo, onClick }) => {
  return (
    <button className={styles.match} key={`key ${game.id}`} onClick={onClick}>
      <div className={styles.upperPart}>
        <img
          className={styles.image}
          src="https://cdn-icons-png.flaticon.com/512/1795/1795606.png"
        />
        <p className={styles.matchTitle}>Portuguese places</p>
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

export default MatchCard;
