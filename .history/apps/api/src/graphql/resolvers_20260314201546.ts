import type { IResolvers } from "apollo-server-fastify";

import type { BookingService } from "@entities/booking/booking.service.js";
import type { HotelService } from "@entities/hotel/hotel.service.js";
import type { RoomService } from "@entities/room/room.service.js";

export interface Context {
  hotelService: HotelService;
  roomService: RoomService;
  bookingService: BookingService;
}

export const resolvers: IResolvers<unknown, Context> = {
  Query: {
    async hotels(_, __, { hotelService }) {
      return hotelService.getAll();
    },

    async hotel(_, { id }, { hotelService }) {
      return hotelService.getById(id);
    },

    async rooms(_, { hotelId }, { roomService }) {
      return roomService.getByHotelId(hotelId);
    },

    async room(_, { id }, { roomService }) {
      return roomService.getById(id);
    },

    async bookings(_, { roomId }, { bookingService }) {
      return bookingService.getByRoomId(roomId);
    },

    async booking(_, { id }, { bookingService }) {
      return bookingService.getById(id);
    },
  },

  Mutation: {
    async createBooking(
      _,
      { roomId, checkIn, checkOut },
      { bookingService },
    ) {
      return bookingService.create({
        roomId,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        status: "avaliable",
      });
    },

    async cancelBooking(_, { bookingId }, { bookingService }) {
      await bookingService.cancelBook(bookingId);
      return true;
    },

    async confirmBooking(_, { bookingId }, { bookingService }) {
      await bookingService.book(bookingId);
      return true;
    },
  },

  Hotel: {
    async rooms(hotel, _, { roomService }) {
      return roomService.getByHotelId(hotel.id);
    },
  },

  Room: {
    async hotel(room, _, { hotelService }) {
      return hotelService.getById(room.hotelId);
    },

    async bookings(room, _, { bookingService }) {
      return bookingService.getByRoomId(room.id);
    },
  },

  Booking: {
    async room(booking, _, { roomService }) {
      return roomService.getById(booking.roomId);
    },
  },
};
