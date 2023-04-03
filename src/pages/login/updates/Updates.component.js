import React from "react";
import { connect } from "react-redux";

import Container from "../../../elements/container";
import Input from "../../../elements/input";
import Button from "../../../elements/button";
import styles from "./Updates.module.scss";
import NerjaImage from "../../../assets/images/nerja.png";
import SunBehindCloudIcon from "../../../assets/icons/sunBehindCloud.png";
import BeachIcon from "../../../assets/icons/beach.png";
import CocktailIcon from "../../../assets/icons/cocktail.png";
import StarIcon from "../../../assets/icons/star.png";
import * as subscribeActions from "../../../redux/actions/subscribe";

const Updates = ({ addEmail }) => {
  const [signupIsSubmitting, setSignupIsSubmitting] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const submitSignup = async ({ email }) => {
    setSignupIsSubmitting(true);
    const response = await addEmail({ email });
    console.log(response, "reponse");
    if (response) {
      setEmail("");
      setSignupIsSubmitting(false);
      alert("I received your signup, thanks! Ciao, Max!");
    }
  };

  return (
    <div className={styles.component}>
      <Container>
        <div className={styles.contentContainer}>
          <div className={styles.subscribeContainer}>
            <p className={styles.header}>
              Subscribe to Announcements of New Features
            </p>
            <div className={styles.signupContainer}>
              <Input
                placeholder="Enter your email here..."
                value={email}
                name="email"
                onChange={(value) => setEmail(value)}
              />
              <Button
                onClick={() => submitSignup({ email: email })}
                variant="primary"
                disabled={!email}
                size="small"
                loading={signupIsSubmitting}
                className={styles.button}
              >
                Sign up
              </Button>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.imageContainer}>
              <img src={NerjaImage} alt="Nerja" className={styles.image} />
              <img src={StarIcon} alt="review" className={styles.starIcon} />
              <p className={styles.reviewTitle}>4.87</p>
              <img src={BeachIcon} alt="beach" className={styles.beachIcon} />
              <img
                src={CocktailIcon}
                alt="nightlife"
                className={styles.cocktailIcon}
              />
              <p className={styles.name}>Nerja, Spain</p>
              <img
                src={SunBehindCloudIcon}
                alt="weather"
                className={styles.sunBehindCloudIcon}
              />
              <p className={styles.temperatureNow}>17° NOW</p>
              <p className={styles.temperatureMonth}>32° in July</p>
              <p className={styles.airport}>AMS - MAL</p>
              <p className={styles.flights}>from €50 in July</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default connect(
  (state) => ({}),
  (dispatch) => ({
    addEmail: ({ email }) => dispatch(subscribeActions.addEmail({ email })),
  })
)(Updates);
