import "fastify";

import type { AppConfig } from "./env.js";

declare module "fastify" {
  interface FastifyInstance {
    config: AppConfig;
  }
}

export {};
