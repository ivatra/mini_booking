import fastifyEnv from "@fastify/env";
import type { FastifyInstance } from "fastify";

export type AppConfig = {
  HOST: string;
  PORT: number;
  NODE_ENV: "development" | "production" | "test";
  CORS_ORIGIN: string;
  RATE_LIMIT_MAX: number;
  RATE_LIMIT_WINDOW_MS: number;
};

const envSchema = {
  type: "object",
  required: ["HOST", "PORT"],
  properties: {
    HOST: { type: "string", default: "0.0.0.0" },
    PORT: { type: "number", default: 8080 },
    NODE_ENV: {
      type: "string",
      enum: ["development", "production", "test"],
      default: "development",
    },
    CORS_ORIGIN: { type: "string", default: "*" },
    RATE_LIMIT_MAX: { type: "number", default: 100 },
    RATE_LIMIT_WINDOW_MS: { type: "number", default: 60_000 },
  },
} as const;

export const registerEnv = async (app: FastifyInstance) => {
  await app.register(fastifyEnv, {
    schema: envSchema,
    dotenv: true,
    confKey: "config",
  });
};
