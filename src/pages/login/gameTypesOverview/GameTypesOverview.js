import React from "react";

import styles from "./GameTypesOverview.module.scss";
import Container from "../../../elements/container";
import GameTypeCard from "../../../components/gameTypeCard";
import GameTypes from "../../../constants/gameTypes";

const GameTypesOverview = () => {
  return (
    <Container>
      <div className={styles.component}>
        <p className={styles.header}>
          What kind of holiday are you looking for?
        </p>
        <div className={styles.gameTypesList}>
          {GameTypes.map((type) => (
            <GameTypeCard
              key={`card ${type.title}`}
              image={type.url}
              title={type.title}
              disabled
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default GameTypesOverview;
