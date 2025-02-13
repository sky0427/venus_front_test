import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { QueryProvider } from "@/lib/react-query/QueryProvider";

import { CookiesProvider } from "react-cookie";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
