import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux/es/exports";
import store from "./components/Context/store";

import "./styles/index.css";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
