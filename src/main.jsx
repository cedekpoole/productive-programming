import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// use Browser router to link pages on a single page application
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
