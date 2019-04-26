import React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";

const AppRouter = () => (
  <Switch>
    {routes.map(route => (
      <Route key={Math.random()} {...route} />
    ))}
  </Switch>
);

export default AppRouter;
