import "dayjs/locale/ru";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app/app.tsx";
import { analytics, getEnvVar } from "@shared";

if (getEnvVar("VITE_ENABLE_ANALYTICS") === "true") {
  analytics.init();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
