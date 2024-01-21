import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";

import { router } from "./routes/router.jsx";
import store from "./state/store.js";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </CookiesProvider>
  </Provider>
);
