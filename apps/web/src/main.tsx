import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import "dayjs/locale/ru";
import "@mantine/dates/styles.css";
import { MantineProvider } from "@mantine/core";
import App from "./App.tsx";
import { DatesProvider } from "@mantine/dates";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="light">
      <DatesProvider settings={{ locale: "ru" }}>
        <App />
      </DatesProvider>
    </MantineProvider>
  </StrictMode>,
);
