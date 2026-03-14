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
      "@shared/graphql/client": resolve(
        __dirname,
        "src/shared/graphql/client.ts",
      ),
      "@shared/graphql/queries": resolve(
        __dirname,
        "src/shared/graphql/queries.ts",
      ),
    },
  },
  test: USER_CONFIG,
});
