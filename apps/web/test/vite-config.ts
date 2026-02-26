import { resolve } from "node:path";
import type { ViteUserConfig } from "vitest/config";

export const USER_CONFIG: ViteUserConfig["test"] = {
  environment: "jsdom",
  globals: true,
  setupFiles: "test/setup.ts",
  include: [
    "test/unit/**/*.t.{ts,tsx}",
    "test/integration/**/*.t.{ts,tsx}",
    "test/api/**/*.t.{ts,tsx}",
  ],
  coverage: {
    provider: "v8",
    reporter: ["text", "text-summary"],
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
