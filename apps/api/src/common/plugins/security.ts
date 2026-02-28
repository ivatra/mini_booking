import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import sensible from "@fastify/sensible";
import type { FastifyInstance } from "fastify";

const parseOrigins = (value: string): true | string[] => {
  if (value.trim() === "*") {
    return true;
  }

  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
};

export const registerSecurity = async (app: FastifyInstance) => {
  await app.register(sensible);

  await app.register(helmet, {
    contentSecurityPolicy: false,
    global: true,
  });

  await app.register(cors, {
    origin: parseOrigins(app.config.CORS_ORIGIN),
    credentials: true,
  });

  await app.register(rateLimit, {
    max: app.config.RATE_LIMIT_MAX,
    timeWindow: app.config.RATE_LIMIT_WINDOW_MS,
  });
};
