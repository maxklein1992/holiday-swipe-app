import React from "react";

import styles from "./HowItWorksItem.module.scss";

const howItWorksItem = ({ item }) => {
  return (
    <div className={styles.component}>
      <div className={styles.iconContainer}>
        <img className={styles.icon} src={item.icon} alt={item.title} />
      </div>
      <div className={styles.contentContainer}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.description}>{item.description}</p>
      </div>
    </div>
  );
};

export default howItWorksItem;
