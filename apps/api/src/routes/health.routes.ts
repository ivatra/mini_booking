import type { FastifyPluginCallback } from "fastify";

export const healthRoutes: FastifyPluginCallback = (app) => {
  app.get("/health", () => ({ ok: true }));
};
