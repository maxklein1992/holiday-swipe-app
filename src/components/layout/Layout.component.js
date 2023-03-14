import React from "react";
import Header from "../header";

import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles.component}>
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
