import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthenticationContextComponent from "./context/Authcontext/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <AuthenticationContextComponent>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </AuthenticationContextComponent>
  </React.StrictMode>
);
