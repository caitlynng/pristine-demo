import React from "react";
import { render } from "react-dom";

import "swiper/css/bundle";
import "./index.css";
import "normalize.css";

import App from "./App";
import { AppProvider } from "./context/appContext";
import { FullscreenProvider } from "./context/fullscreenContext";

const root = document.getElementById("root"); // <- This is the correct method call for React version 17

render(
  <React.StrictMode>
    <FullscreenProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </FullscreenProvider>
  </React.StrictMode>,
  root
);
