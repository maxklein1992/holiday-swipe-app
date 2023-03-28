import React from "react";

import styles from "./FrontPage.module.scss";
import Header from "../../../components/header/Header.component";
import Button from "../../../elements/button";

const FrontPage = () => {
  return (
    <div className={styles.backgroundImageContainer}>
      <div className={styles.backgroundImage} />
      <div className={styles.headerContainer}>
        <Header />
      </div>
      <p className={styles.header}>What is your dream holiday?</p>
      <p className={styles.subHeader}>Let's find it</p>
      <Button variant="secondary">How It Works</Button>
    </div>
  );
};

export default FrontPage;
