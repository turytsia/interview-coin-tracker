import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.css";

import App from "./App";
import CoinsProvider from "./components/Context/CoinsProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CoinsProvider>
      <App />
    </CoinsProvider>
  </React.StrictMode>
);
