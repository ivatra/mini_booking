import {
  bookingFieldResolvers,
  bookingMutationResolvers,
  bookingQueryResolvers,
  bookingSubscriptionResolvers,
} from "@entities/booking/booking.resolvers.js";
import type { BookingService } from "@entities/booking/booking.service.js";
import {
  hotelFieldResolvers,
  hotelQueryResolvers,
} from "@entities/hotel/hotel.resolvers.js";
import type { HotelService } from "@entities/hotel/hotel.service.js";
import {
  roomFieldResolvers,
  roomQueryResolvers,
} from "@entities/room/room.resolvers.js";
import type { RoomService } from "@entities/room/room.service.js";

import type { GqlResolvers } from "./generated.js";

export interface Context {
  hotelService: HotelService;
  roomService: RoomService;
  bookingService: BookingService;
}

export const resolvers: GqlResolvers<Context> = {
  Query: {
    ...hotelQueryResolvers,
    ...roomQueryResolvers,
    ...bookingQueryResolvers,
  },
  Mutation: bookingMutationResolvers,
  Hotel: hotelFieldResolvers,
  Room: roomFieldResolvers,
  Booking: bookingFieldResolvers,
  Subscription: bookingSubscriptionResolvers,
};
