import type { FastifyPluginAsync } from "fastify";

import { BookingService } from "@entities/booking/booking.service.js";
import { HotelService } from "@entities/hotel/hotel.service.js";
import { RoomService } from "@entities/room/room.service.js";

import { graphqlRoutes } from "../graphql/server.js";

import { healthRoutes } from "./health.routes.js";

export const apiRoutes: FastifyPluginAsync = async (app) => {
  const hotelService = new HotelService();
  const roomService = new RoomService();
  const bookingService = new BookingService(roomService);

  await app.register(healthRoutes);

  // GraphQL endpoint
  await app.register(graphqlRoutes, {
    hotelService,
    roomService,
    bookingService,
  });
};
