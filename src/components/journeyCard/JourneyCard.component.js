import React from "react";

import styles from "./JourneyCard.module.scss";
import Button from "../../elements/button";

const JourneyCard = ({ onClick, image, title, disabled }) => {
  // Defensive
  if (!title || !image) return null;

  return (
    <button
      className={[
        styles.journeyTypeContainer,
        disabled && styles.disabled,
      ].join(" ")}
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
