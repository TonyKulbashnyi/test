import React from "react";
import NotFoundPage from "../components/NotFoundPage";
import Home from "../components/Home";

export default [
  {
    path: "/",
    component: Home,
    exact: true
  },
  {
    component: NotFoundPage
  }
];
