import React from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { dashboard } from "../../constants/paths";
import styles from "./Login.module.scss";
import * as authActions from "../../redux/actions/auth";
import FrontPage from "./frontPage/FrontPage.component";
import Introduction from "./introduction";
import GameTypesOverview from "./gameTypesOverview/GameTypesOverview.component";
import PositanoImage from "../../assets/images/positano.png";
import FlorianopolisImage from "../../assets/images/florianopolis.png";
import FlorianopolisImage2 from "../../assets/images/florianopolis2.png";
import FlorianopolisImage3 from "../../assets/images/florianopolis3.png";
import RioDeJaneiroImage from "../../assets/images/riodejaneiro.png";
import SpainImage from "../../assets/images/spain.png";
import ItalyImage from "../../assets/images/italy.png";
import ItalyImage2 from "../../assets/images/italy2.png";
import CoupleKissImage from "../../assets/images/couple_kiss.png";
import { getRandomNumber } from "../../utils/randomNumber";
import HowItWorks from "./howItWorks";
import Updates from "./updates";

const Login = ({ isAuthenticated, authLoading }) => {
  const [backgroundImage, setBackgroundImage] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const selectRandomBackgroundImage = () => {
    const backgroundImages = [
      PositanoImage,
      FlorianopolisImage,
      FlorianopolisImage2,
      FlorianopolisImage3,
      RioDeJaneiroImage,
      SpainImage,
      ItalyImage,
      ItalyImage2,
      CoupleKissImage,
    ];
    const randomNumber = getRandomNumber(backgroundImages.length);

    return backgroundImages[randomNumber];
  };

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const backgroundImage = await selectRandomBackgroundImage();
        setBackgroundImage(backgroundImage);
        setLoading(false);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    })();
  }, []);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated && authLoading === false) navigate(dashboard);
  }, [isAuthenticated]);

  if (loading) return null;

  return (
    <div className={styles.component}>
      <FrontPage backgroundImage={backgroundImage} />
      <Introduction />
      <HowItWorks />
      <Updates />
      <GameTypesOverview />
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
