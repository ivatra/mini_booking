import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

import { USER_CONFIG } from "./test/vite-config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
  resolve: {
    alias: {
      "@pages": resolve(__dirname, "src/pages"),
      "@entities": resolve(__dirname, "src/entities"),
      "@shared": resolve(__dirname, "src/shared"),
      "@graphql": resolve(__dirname, "src/shared/graphql"),
    },
  },
  test: USER_CONFIG,
});
