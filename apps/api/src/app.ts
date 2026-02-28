import Fastify from "fastify";

import { registerEnv } from "@common/env.js";
import { errorHandler } from "@common/error-handler.js";
import { registerSecurity } from "@common/plugins/security.js";

import { apiRoutes } from "./routes/index.js";

export const buildApp = async () => {
  const app = Fastify({
    logger: true,
    trustProxy: true,
  });

  await registerEnv(app);
  await registerSecurity(app);

  app.setErrorHandler(errorHandler);

  await app.register(apiRoutes, { prefix: "/api" });

  return app;
};
