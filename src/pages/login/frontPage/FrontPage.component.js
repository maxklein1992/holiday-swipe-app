import React from "react";

import styles from "./FrontPage.module.scss";
import Header from "../../../components/header/Header.component";
import Button from "../../../elements/button";
import { data } from "./FrontPage.data";

const FrontPage = ({ backgroundImage }) => {
  return (
    <div className={styles.component}>
      <div className={styles.backgroundImageContainer}>
        <div
          className={styles.backgroundImage}
          style={{
            backgroundImage: "url(" + backgroundImage + ")",
          }}
        />
      </div>
      <div className={styles.headerContainer}>
        <Header transparent={true} />
      </div>
      <p className={styles.header}>{data.header}</p>
      <p className={styles.subHeader}>{data.subHeader}</p>
      <Button
        variant="secondary"
        onClick={() =>
          document
            .querySelector(`#howItWorks`)
            .scrollIntoView({ behavior: "smooth" })
        }
      >
        How It Works
      </Button>
    </div>
  );
};

export default FrontPage;
