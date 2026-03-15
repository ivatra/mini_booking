import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vitest/config";

import { USER_CONFIG } from "./test/vite-config";

// https://vite.dev/config/
export default defineConfig({
  base: "/s/booking",
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      filename: "stats.html",
    }),
  ],
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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          posthog: ["posthog-js"],
          apollo: ["@apollo/client", "graphql"],
          mantine: ["@mantine/core", "@mantine/hooks"],
        },
      },
    },
  },
  test: USER_CONFIG,
});
