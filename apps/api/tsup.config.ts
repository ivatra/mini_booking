// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // точка входа
  format: ["esm"], // ESM, import.meta.url поддерживается
  target: "node20",
  bundle: true, // бандлим свой код, но node_modules остаются отдельными
  splitting: false, // один файл для своего кода
  minify: true, // минимизация бандла
  dts: false, // не генерируем типы для продакшена
  clean: true,
  shims: true,
  external: ["@prisma/client"], // Prisma остаётся в node_modules
  env: {
    NODE_ENV: "production",
  },
});
