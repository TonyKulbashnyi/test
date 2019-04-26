import React from "react";
import { Router } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import AppRouter from "./AppRouter";

export const history = createHistory();

const ClientAppRouter = () => (
  <Router history={history}>
    <AppRouter />
  </Router>
);

export default ClientAppRouter;
