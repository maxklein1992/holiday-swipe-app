import React from "react";

import styles from "./FrontPage.module.scss";
import Header from "../../../components/header/Header.component";
import Button from "../../../elements/button";

import PositanoImage from "./positano.png";
import FlorianopolisImage from "./florianopolis.png";
import FlorianopolisImage2 from "./florianopolis2.png";
import FlorianopolisImage3 from "./florianopolis3.png";
import RioDeJaneiroImage from "./riodejaneiro.png";
import SpainImage from "./spain.png";
import ItalyImage from "./italy.png";
import ItalyImage2 from "./italy2.png";

const randomSelectBackgroundImage = () => {
  const backgroundImages = [
    PositanoImage,
    FlorianopolisImage,
    FlorianopolisImage2,
    FlorianopolisImage3,
    RioDeJaneiroImage,
    SpainImage,
    ItalyImage,
    ItalyImage2,
  ];

  const randomNumber = Math.floor(Math.random() * backgroundImages.length);

  return backgroundImages[randomNumber];
};

const FrontPage = () => {
  return (
    <div className={styles.component}>
      <div className={styles.backgroundImageContainer}>
        <div
          className={styles.backgroundImage}
          style={{
            backgroundImage: "url(" + randomSelectBackgroundImage() + ")",
          }}
        />
      </div>
      <div className={styles.headerContainer}>
        <Header transparent={true} />
      </div>
      <p className={styles.header}>What is your dream holiday?</p>
      <p className={styles.subHeader}>Let's find it</p>
      <Button variant="secondary">How It Works</Button>
    </div>
  );
};

export default FrontPage;
