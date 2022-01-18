import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const Initializer = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
ReactDOM.render(<Initializer></Initializer>, document.getElementById("root"));
