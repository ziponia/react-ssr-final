import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import reducer from "./module";
import { Provider as ReduxProvider } from "react-redux";
import { createStore } from "redux";
import { loadableReady } from "@loadable/component";

const preloadedState = ((window as any) || {}).__PRELOADED_STATE__;

delete (window as any).__PRELOADED_STATE__;

export const store = createStore(reducer, preloadedState);

console.log("여기는 INDEX >>>> 호출 되는부분인가???");

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  loadableReady(() => {
    console.log("loadable ready!!");
    ReactDOM.hydrate(
      <ReduxProvider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReduxProvider>,
      document.getElementById("root")
    );
  });
} else {
  ReactDOM.render(
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>,
    document.getElementById("root")
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
