import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import ClientAppRouter from "./routers/ClientAppRouter";
import { init } from "./actions/game";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <BrowserRouter>
      <ClientAppRouter />
    </BrowserRouter>
  </Provider>
);

const render = () => {
  const renderMethod = process.env.production
    ? ReactDOM.hydrate
    : ReactDOM.render;
  renderMethod(jsx, document.getElementById("app"));
};
render();

store.dispatch(init());
