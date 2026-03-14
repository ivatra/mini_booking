import type {
  GqlBookingResolvers,
  GqlMutationResolvers,
  GqlQueryResolvers,
  GqlSubscriptionResolvers,
} from "@graphql/generated.js";
import type { Context } from "@graphql/resolvers.js";
import { EventEmitter } from "events";

import type { Booking as EntityBooking } from "./booking.types.js";

export const pubSub = new EventEmitter();

export const bookingQueryResolvers: Pick<
  GqlQueryResolvers<Context>,
  "bookings" | "booking"
> = {
  async bookings(_parent, { roomId }, { bookingService }) {
    return bookingService.getByRoomId(roomId);
  },

  async booking(_parent, { id }, { bookingService }) {
    return bookingService.getById(id) ?? null;
  },
};

export const bookingMutationResolvers: GqlMutationResolvers<Context> = {
  async createBooking(
    _parent,
    { roomId, checkIn, checkOut },
    { bookingService },
  ) {
    const booking = await bookingService.create({
      roomId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      status: "avaliable",
    });
    pubSub.emit(`booking-status-changed:${roomId}`, booking);
    return booking;
  },

  async cancelBooking(_parent, { bookingId }, { bookingService }) {
    await bookingService.cancelBook(bookingId);
    const booking = await bookingService.getById(bookingId);
    if (booking) {
      pubSub.emit(`booking-status-changed:${booking.roomId}`, booking);
    }
    return true;
  },

  async confirmBooking(_parent, { bookingId }, { bookingService }) {
    await bookingService.book(bookingId);
    const booking = await bookingService.getById(bookingId);
    if (booking) {
      pubSub.emit(`booking-status-changed:${booking.roomId}`, booking);
    }
    return true;
  },
};

export const bookingFieldResolvers: GqlBookingResolvers<Context> = {
  async room(booking, _args, { roomService }) {
    const room = await roomService.getById(booking.roomId);
    if (!room) throw new Error(`Room not found for booking ${booking.id}`);
    return room;
  },
};

export const bookingSubscriptionResolvers: GqlSubscriptionResolvers<Context> = {
  bookingStatusChanged: {
    subscribe: (
      _parent,
      { roomId },
    ): AsyncIterable<{ bookingStatusChanged: EntityBooking }> => {
      let resolve: ((value: EntityBooking) => void) | null = null;

      const handler = (booking: EntityBooking) => {
        resolve?.(booking);
      };

      pubSub.on(`booking-status-changed:${roomId}`, handler);

      const iterator: AsyncIterableIterator<{
        bookingStatusChanged: EntityBooking;
      }> = {
        async next() {
          const booking = await new Promise<EntityBooking>((r) => {
            resolve = r;
          });
          return { value: { bookingStatusChanged: booking }, done: false };
        },
        return() {
          pubSub.off(`booking-status-changed:${roomId}`, handler);
          return Promise.resolve({
            value: {
              bookingStatusChanged: undefined as unknown as EntityBooking,
            },
            done: true,
          });
        },
        [Symbol.asyncIterator]() {
          return this;
        },
      };

      return iterator;
    },
  },
};
