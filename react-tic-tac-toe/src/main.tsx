import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Game from "./components/Game";
import Popup from "./components/Popup";

ReactDOM.render(
  <React.StrictMode>
    <>
      <Game />
    </>
  </React.StrictMode>,
  document.getElementById("root")
);
