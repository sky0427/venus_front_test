import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { QueryProvider } from "@/lib/react-query/QueryProvider";

import App from "./App";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <QueryProvider>
          <App />
        </QueryProvider>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
