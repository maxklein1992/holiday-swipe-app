import React from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { dashboard } from "../../constants/paths";
import GameTypeCard from "../../components/gameTypeCard";
import styles from "./Login.module.scss";
import * as authActions from "../../redux/actions/auth";
import GameTypes from "../../constants/gameTypes";

import Image from "./home_page_background.png";
import Button from "../../elements/button";
import Container from "../../elements/container";
import Header from "../../components/header/Header.component";

const Login = ({ isAuthenticated, authLoading }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated && authLoading === false) navigate(dashboard);
  }, [isAuthenticated]);

  return (
    // <div className={styles.component}>
    //   {/* <div className={styles.headerComponent}>
    //     <h1 className={styles.headerTitle}>
    //       Find your next holiday destination
    //     </h1>
    //     <h1 className={styles.subTitle}>
    //       By swiping through holiday locations with your partner, friend or
    //       family member
    //     </h1>
    //   </div>
    //   <div className={styles.gameTypesComponent}>
    //     <h1 className={styles.gameTypesTitle}>
    //       Choose your type of <span className={styles.isBlue}>holiday</span>
    //     </h1>
    //     <div className={styles.gameTypesList}>
    //       {GameTypes.map((type) => (
    //         <GameTypeCard
    //           key={`card ${type.title}`}
    //           image={type.url}
    //           title={type.title}
    //           disabled
    //         />
    //       ))}
    //     </div>
    //   </div> */}
    //   <img
    //     src="/home_page_background.png"
    //     style={{ width: "100%", height: "100%" }}
    //   />
    //   <div
    //     style={{
    //       backgroundImage: "url(" + Image + ")",
    //       backgroundSize: "auto",
    //       width: "100%",
    //       height: "100%",
    //     }}
    //   >
    //     Background Image
    //   </div>
    // </div>
    <div className={styles.component}>
      <div className={styles.backgroundImageContainer}>
        <div className={styles.backgroundImage} />
        <div className={styles.headerContainer}>
          <Header />
        </div>
        <p className={styles.header}>What is your dream holiday?</p>
        <p className={styles.subHeader}>Let's find it</p>
        <Button variant="secondary">How It Works</Button>
      </div>
      <Container>
        <div className={styles.destinationTypesContainer}>
          <p className={styles.destinationTypesHeader}>Destination Types</p>
        </div>
      </Container>
    </div>
  );
};

export default connect(
  (state) => ({
    authLoading: state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated,
  }),
  (dispatch) => ({
    signIn: () => dispatch(authActions.signIn()),
  })
)(Login);
