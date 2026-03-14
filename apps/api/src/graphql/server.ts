import { ApolloServer } from "apollo-server-fastify";
import type { FastifyPluginAsync } from "fastify";
import { readFileSync } from "fs";
import { join } from "path";

import type { BookingService } from "@entities/booking/booking.service.js";
import type { HotelService } from "@entities/hotel/hotel.service.js";
import type { RoomService } from "@entities/room/room.service.js";

import type { Context } from "./resolvers.js";
import { resolvers } from "./resolvers.js";

const typeDefs = readFileSync(
  join(process.cwd(), "src/graphql/schema.graphql"),
  "utf-8",
);

export const createGraphQLServer = (
  hotelService: HotelService,
  roomService: RoomService,
  bookingService: BookingService,
): ApolloServer<Context> => {
  return new ApolloServer<Context>({
    typeDefs,
    resolvers,
    context: () => ({
      hotelService,
      roomService,
      bookingService,
    }),
  });
};

export const graphqlRoutes: FastifyPluginAsync<{
  hotelService: HotelService;
  roomService: RoomService;
  bookingService: BookingService;
}> = async (app, { hotelService, roomService, bookingService }) => {
  const apolloServer = createGraphQLServer(
    hotelService,
    roomService,
    bookingService,
  );

  await apolloServer.start();
  await app.register(apolloServer.createHandler());
};
