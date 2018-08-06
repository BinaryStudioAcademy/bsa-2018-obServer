import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import App from "./containers/App/App";
import reducer from "./redux/reducer";
import { StoreState } from "./types/StoreState";

if (typeof Storage === "undefined") {
  ReactDOM.render(
    <p>
      Your browser does not support Web Storage API. Please update your browser
      or use another one.
    </p>,
    document.getElementById("root")
  );
} else {
  const store = createStore<StoreState, any, {}, {}>(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  ReactDOM.render(
    <Provider store={store}>
      <App msg="Hello World" />
    </Provider>,
    document.getElementById("root")
  );
}
