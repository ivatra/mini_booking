import type { FastifyPluginCallback } from "fastify";

import type { BookingController } from "./booking.controller.js";

const bookingCreateSchema = {
  body: {
    type: "object",
    required: ["roomId", "guestName", "checkIn", "checkOut"],
    properties: {
      roomId: { type: "string", minLength: 3 },
      guestName: { type: "string", minLength: 2 },
      checkIn: { type: "string", format: "date" },
      checkOut: { type: "string", format: "date" },
    },
    additionalProperties: false,
  },
} as const;

export const createBookingRoutes = (
  controller: BookingController,
): FastifyPluginCallback => {
  return (app) => {
    app.get("/", controller.getAll);
    app.post("/", { schema: bookingCreateSchema }, controller.create);
  };
};
