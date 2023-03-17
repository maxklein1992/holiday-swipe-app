import React from "react";

import styles from "./JourneyCard.module.scss";

const JourneyCard = ({ onClick, image, title, disabled }) => {
  //defensive
  if (!title || !image) return;

  return (
    <button
      className={styles.journeyTypeContainer}
      onClick={!disabled && onClick && onClick}
    >
      <div className={styles.imageContainer}>
        <img className={styles.image} src={image} />
      </div>
      <p className={styles.journeyTypeTitle}>{title}</p>
    </button>
  );
};

export default JourneyCard;
