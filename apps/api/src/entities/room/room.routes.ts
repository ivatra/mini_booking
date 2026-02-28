import type { FastifyPluginCallback } from "fastify";

import type { RoomController } from "./room.controller.js";

const roomQuerySchema = {
  querystring: {
    type: "object",
    properties: {
      hotelId: { type: "string" },
    },
  },
} as const;

export const createRoomRoutes = (
  controller: RoomController,
): FastifyPluginCallback => {
  return (app) => {
    app.get("/", { schema: roomQuerySchema }, controller.getAll);
  };
};
