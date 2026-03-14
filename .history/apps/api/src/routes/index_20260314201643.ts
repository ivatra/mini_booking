import type { FastifyPluginAsync } from "fastify";

import { BookingController } from "@entities/booking/booking.controller.js";
import { createBookingRoutes } from "@entities/booking/booking.routes.js";
import { BookingService } from "@entities/booking/booking.service.js";
import { HotelController } from "@entities/hotel/hotel.controller.js";
import { createHotelRoutes } from "@entities/hotel/hotel.routes.js";
import { HotelService } from "@entities/hotel/hotel.service.js";
import { RoomController } from "@entities/room/room.controller.js";
import { createRoomRoutes } from "@entities/room/room.routes.js";
import { RoomService } from "@entities/room/room.service.js";

import { graphqlRoutes } from "../graphql/server.js";

import { healthRoutes } from "./health.routes.js";

export const apiRoutes: FastifyPluginAsync = async (app) => {
  const hotelService = new HotelService();
  const roomService = new RoomService();
  const bookingService = new BookingService(roomService);

  const hotelController = new HotelController(hotelService);
  const roomController = new RoomController(roomService);
  const bookingController = new BookingController(bookingService);

  await app.register(healthRoutes);

  // GraphQL endpoint
  await app.register(graphqlRoutes, {
    hotelService,
    roomService,
    bookingService,
  });

  // REST endpoints (kept for backward compatibility)
  await app.register(createHotelRoutes(hotelController), {
    prefix: "/rest/hotels",
  });
  await app.register(createRoomRoutes(roomController), {
    prefix: "/rest/rooms",
  });
  await app.register(createBookingRoutes(bookingController), {
    prefix: "/rest/bookings",
  });
};
