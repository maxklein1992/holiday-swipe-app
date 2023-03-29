import React from "react";
import Header from "../header";

import styles from "./Layout.module.scss";
import Container from "../../elements/container";

const Layout = ({ children }) => {
  return (
    <>
      <Header transparent={false} />
      <Container>
        <main>{children}</main>
      </Container>
    </>
  );
};

export default Layout;
