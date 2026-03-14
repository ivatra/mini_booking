import type { BookingService } from "@entities/booking/booking.service.js";
import type { HotelService } from "@entities/hotel/hotel.service.js";
import type { RoomService } from "@entities/room/room.service.js";

export interface Context {
  hotelService: HotelService;
  roomService: RoomService;
  bookingService: BookingService;
}

export const resolvers = {
  Query: {
    async hotels(_parent: any, _args: any, { hotelService }: Context) {
      return hotelService.getAll();
    },

    async hotel(_parent: any, { id }: { id: string }, { hotelService }: Context) {
      return hotelService.getById(id);
    },

    async rooms(_parent: any, { hotelId }: { hotelId: string }, { roomService }: Context) {
      return roomService.getByHotelId(hotelId);
    },

    async room(_parent: any, { id }: { id: string }, { roomService }: Context) {
      return roomService.getById(id);
    },

    async bookings(_parent: any, { roomId }: { roomId: string }, { bookingService }: Context) {
      return bookingService.getByRoomId(roomId);
    },

    async booking(_parent: any, { id }: { id: string }, { bookingService }: Context) {
      return bookingService.getById(id);
    },
  },

  Mutation: {
    async createBooking(
      _parent: any,
      { roomId, checkIn, checkOut }: { roomId: string; checkIn: string; checkOut: string },
      { bookingService }: Context,
    ) {
      return bookingService.create({
        roomId,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        status: "avaliable",
      });
    },

    async cancelBooking(_parent: any, { bookingId }: { bookingId: string }, { bookingService }: Context) {
      await bookingService.cancelBook(bookingId);
      return true;
    },

    async confirmBooking(_parent: any, { bookingId }: { bookingId: string }, { bookingService }: Context) {
      await bookingService.book(bookingId);
      return true;
    },
  },

  Hotel: {
    async rooms(hotel: any, _args: any, { roomService }: Context) {
      return roomService.getByHotelId(hotel.id);
    },
  },

  Room: {
    async hotel(room: any, _args: any, { hotelService }: Context) {
      return hotelService.getById(room.hotelId);
    },

    async bookings(room: any, _args: any, { bookingService }: Context) {
      return bookingService.getByRoomId(room.id);
    },
  },

  Booking: {
    async room(booking: any, _args: any, { roomService }: Context) {
      return roomService.getById(booking.roomId);
    },
  },
};
