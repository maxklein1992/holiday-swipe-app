import React from "react";
import { Router, BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "./constants/paths";
import Home from "./pages/home";
import Login from "./pages/login";
import { refresh } from "./redux/actions/auth";
import { getUserId } from "./utils/jwt";

const Routing = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(refresh());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={login} element={<Login />} />
        <Route path="dashboard" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
