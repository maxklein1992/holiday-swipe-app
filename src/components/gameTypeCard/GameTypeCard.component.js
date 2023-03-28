import React from "react";

import styles from "./GameTypeCard.module.scss";

const GameTypeCard = ({ onClick, image, title, disabled }) => {
  // Defensive
  if (!title || !image) return null;

  return (
    <button
      className={[styles.component, disabled && styles.disabled].join(" ")}
      onClick={!disabled && onClick && onClick}
    >
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={
            "https://darkrome.com/media/20502/rome-colosseum-city-tour-of-rome.jpg"
          }
        />
      </div>
      <div className={styles.textContainer}>
        <p className={styles.gameTypeTitle}>{title}</p>
      </div>
    </button>
  );
};

export default GameTypeCard;
