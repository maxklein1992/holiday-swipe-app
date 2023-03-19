import React from "react";

import styles from "./DestinationCard.module.scss";

const DestinationCard = ({ image, name }) => {
  return (
    <div
      className={styles.component}
      style={{ backgroundImage: `url(${image})` }}
    >
      <p className={styles.name}>{name}</p>
    </div>
  );
};

export default DestinationCard;
