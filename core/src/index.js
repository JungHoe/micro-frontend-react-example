import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as ReactRouterDom from "react-router-dom";

import { BrowserRouter } from "react-router-dom";

window["common-lib"] = {
  React,
  ReactRouterDom,
};

const Initializer = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
ReactDOM.render(<Initializer></Initializer>, document.getElementById("root"));
