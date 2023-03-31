import React from "react";

import styles from "./HowItWorks.module.scss";
import Container from "../../../elements/container";
import { data } from "./HowItWorks.data";
import HowItWorksItem from "./howItWorksItem";
import PugliaImage from "../../../assets/images/italy.png";
import DislikeIcon from "../../../assets/icons/dislike.png";
import LikeIcon from "../../../assets/icons/like.png";
import AnimatedHeartIcon from "../../../assets/icons/animatedHeart.gif";

const HowItWorks = () => {
  return (
    <Container>
      <div className={styles.component} id="howItWorks">
        <div className={styles.headerContainer}>
          <p className={styles.subHeader}>How it works</p>
          <p className={styles.header}>How to find a holiday</p>
        </div>
        <div className={styles.howContainer}>
          <div className={styles.contentContainer}>
            {data.steps.map((item) => (
              <HowItWorksItem item={item} />
            ))}
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.imageContainer}>
              <img src={PugliaImage} alt="Puglia" className={styles.image} />
              <p className={styles.name}>Puglia</p>
            </div>
            <div className={styles.buttonsContainer}>
              <img src={AnimatedHeartIcon} alt="heart" className={styles.gif} />
              <img src={DislikeIcon} alt="dislike" className={styles.icon} />
              <img src={LikeIcon} alt="like" className={styles.icon} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HowItWorks;
