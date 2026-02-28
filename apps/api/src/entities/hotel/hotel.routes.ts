import type { FastifyPluginCallback } from "fastify";

import type { HotelController } from "./hotel.controller.js";

export const createHotelRoutes = (
  controller: HotelController,
): FastifyPluginCallback => {
  return (app) => {
    app.get("/", controller.getAll);
  };
};
