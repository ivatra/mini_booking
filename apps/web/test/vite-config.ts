import { resolve } from "node:path";
import type { ViteUserConfig } from "vitest/config";

export const USER_CONFIG: ViteUserConfig["test"] = {
  environment: "jsdom",
  globals: true,
  setupFiles: "test/setup.ts",
  include: ["test/unit/**/*.t.{ts,tsx}", "test/integration/**/*.test.{ts,tsx}"],
  coverage: {
    provider: "v8",
    reporter: ["text", "json", "html"],
    exclude: [
      "test/**",
      "**/*.t.{ts,tsx}",
      "**/*.config.{ts,js}",
      "**/types.ts",
    ],
  },
  alias: {
    "@app": resolve(__dirname, "../src/app"),
  },
};
