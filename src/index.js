import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UIWrapper } from "./contexts/ui";
import App from "./App";
import { createRoot } from "react-dom/client";
import demos from "demos/demos";
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
    <UIWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />} />
          {demos.map((_demo, _idx) => (
            <Route
              key={_demo.id}
              path={_demo.id}
              element={<App demoIdx={_idx} />}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </UIWrapper>
  </React.StrictMode>
);
