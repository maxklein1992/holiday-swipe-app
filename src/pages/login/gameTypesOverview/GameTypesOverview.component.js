import React from "react";

import styles from "./GameTypesOverview.module.scss";
import Container from "../../../elements/container";
import GameTypeCard from "../../../components/gameTypeCard";
import GameTypes from "../../../constants/gameTypes";

const GameTypesOverview = () => {
  return (
    <Container>
      <div className={styles.component}>
        <p className={styles.subHeader}>Plan your trip</p>
        <p className={styles.header}>
          What kind of holiday are you looking for?
        </p>
        <div className={styles.gameTypesList}>
          <div className={styles.gameTypeContent}>
            <p className={styles.gameTypeHeader}>Places</p>
            <div className={styles.gameTypeContainer}>
              {GameTypes.places.map((type) => (
                <GameTypeCard
                  key={`card ${type.title}`}
                  image={type.url}
                  title={type.title}
                  description={type.description}
                  icon={type.icon}
                />
              ))}
            </div>
          </div>
          <div className={styles.gameTypeContent}>
            <p className={styles.gameTypeHeader}>Countries</p>
            <div className={styles.gameTypeContainer}>
              {GameTypes.countries.map((type) => (
                <GameTypeCard
                  key={`card ${type.title}`}
                  image={type.url}
                  title={type.title}
                  description={type.description}
                  icon={type.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default GameTypesOverview;
