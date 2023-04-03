import React from "react";
import Container from "../../../elements/container";

import styles from "./Introduction.module.scss";

const Introduction = () => {
  return (
    <Container>
      <div className={styles.component}>
        <p className={styles.subHeader}>Introducing Holiday Swipe</p>
        <p className={styles.header}>
          Best and easiest way to find your holiday
        </p>
        <p className={styles.description}>
          Holiday Swipe is a new travel guide platform to find the perfect
          holiday for you and your travel partner.
        </p>
      </div>
    </Container>
  );
};

export default Introduction;
