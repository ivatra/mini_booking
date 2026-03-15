import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import fastifyRateLimit from "@fastify/rate-limit";
import type { FastifyInstance } from "fastify";

import { getEnvVar } from "@common/helpers";

export const registerSecurity = async (app: FastifyInstance) => {
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://unpkg.com"],
        styleSrc: ["'self'", "https://unpkg.com"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  });

  await app.register(fastifyCors, {
    origin: getEnvVar("CORS_ORIGIN") || "",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  await app.register(fastifyRateLimit, {
    max: app.config.RATE_LIMIT_MAX,
    timeWindow: app.config.RATE_LIMIT_WINDOW_MS,
  });
};
