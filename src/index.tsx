import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "app";
import store from "services/redux/store";
import "assets/styles/global.scss";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
