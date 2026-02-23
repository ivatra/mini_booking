import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCase", // или "camelCaseOnly"
    },
  },
  resolve: {
    alias: {
      "@pages": resolve(__dirname, "src/pages"),
      "@entities": resolve(__dirname, "src/entities"),
      "@shared": resolve(__dirname, "src/shared"),
    },
  },
});
