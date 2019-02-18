import React from "react";
import ReactDOM from "react-dom";

import Root from "Root"; // Redux setup
import App from "components/App";

ReactDOM.render(
  <Root initialState={{}}>
    <App />
  </Root>,
  document.querySelector("#root")
);
