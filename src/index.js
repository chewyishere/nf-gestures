import React from "react";
import { Helmet } from "react-helmet";
import App from "./App";
import { createRoot } from "react-dom/client";
import "./index.scss";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Helmet>
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
    </Helmet>
    <App />
  </React.StrictMode>
);
