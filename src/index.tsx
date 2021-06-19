import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { rootStore } from "./stores";
import { StoreContextProvider } from "./contexts/store-context";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreContextProvider store={rootStore}>
        <App />
      </StoreContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
