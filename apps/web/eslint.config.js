import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";

import TEST_IMPORT_OVERRIDE from "./test/eslint-config.js";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    plugins: {
      import: importPlugin,
      "unused-imports": unusedImports,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "padding-line-between-statements": [
        "warn",
        { blankLine: "always", prev: "import", next: "*" },
        { blankLine: "any", prev: "import", next: "import" },
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
      ],

      "import/order": [
        "warn",
        {
          groups: [
            ["builtin", "external"],
            ["internal"],
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],

      "no-restricted-imports": [
        "error",
        {
          patterns: [
            "@app/*",
            "@pages/*/*",
            "@entities/*/*",
            "@shared/*/*",

            "../pages/*/*",
            "../../pages/*/*",
            "../../../pages/*/*",

            "../entities/*/*",
            "../../entities/*/*",
            "../../../entities/*/*",

            "../shared/*/*",
            "../../shared/*/*",
            "../../../shared/*/*",

            "src/*",
          ],
        },
      ],

      "no-trailing-spaces": "warn",
      "eol-last": ["warn", "always"],
      "spaced-comment": ["warn", "always", { markers: ["/"] }],
    },
  },
  ...TEST_IMPORT_OVERRIDE,
  // Важно: отключает конфликтующие формат-правила ESLint с Prettier
  eslintConfigPrettier,
]);
