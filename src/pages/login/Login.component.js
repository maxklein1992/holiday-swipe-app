import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { dashboard } from "../../constants/paths";
import styles from "./Login.module.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  React.useEffect(() => {
    if (isAuthenticated) navigate(dashboard);
  }, [isAuthenticated]);

  return (
    <div className={styles.component}>
      <div className={styles.headerComponent}>
        <h1 className={styles.headerTitle}>
          Find your next holiday destination
        </h1>
        <h1 className={styles.subTitle}>
          By swiping through holiday locations with your partner, friend or
          family member
        </h1>
      </div>
    </div>
  );
};

export default Login;
