import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import "./styles/styles.scss";

const store = configureStore();

const tsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(tsx, document.getElementById("root"));
