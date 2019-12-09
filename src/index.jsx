import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.css";
import "./stylesheets/style.css";

import App from "./App.jsx";

import configureStore from "./store";

const Store = configureStore();

const renderApp = () => (
  <Provider store={Store}>
    <App />
  </Provider>
);

render(renderApp(), document.querySelector("#react-app"));
