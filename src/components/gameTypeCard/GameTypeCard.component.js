import React from "react";

import styles from "./GameTypeCard.module.scss";

const GameTypeCard = ({ onClick, image, title, description, icon }) => {
  // Defensive
  if (!title || !image) return null;

  return (
    <button className={[styles.component].join(" ")} onClick={onClick}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={image} alt={title} />
      </div>
      <div className={styles.textContainer}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <img className={styles.icon} src={icon} alt={icon} />
    </button>
  );
};

export default GameTypeCard;
