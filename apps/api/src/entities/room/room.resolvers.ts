import type {
  GqlQueryResolvers,
  GqlRoomResolvers,
} from "@graphql/generated.js";
import type { Context } from "@graphql/resolvers.js";

export const roomQueryResolvers: Pick<
  GqlQueryResolvers<Context>,
  "rooms" | "room"
> = {
  async rooms(_parent, { hotelId }, { roomService }) {
    return roomService.getByHotelId(hotelId);
  },

  async room(_parent, { id }, { roomService }) {
    return roomService.getById(id) ?? null;
  },
};

export const roomFieldResolvers: GqlRoomResolvers<Context> = {
  async hotel(room, _args, { hotelService }) {
    const hotel = await hotelService.getById(room.hotelId);
    if (!hotel) throw new Error(`Hotel not found for room ${room.id}`);
    return hotel;
  },

  async bookings(room, _args, { bookingService }) {
    return bookingService.getByRoomId(room.id);
  },

  async isAvailable(room, { checkIn, checkOut }, { bookingService }) {
    const bookings = await bookingService.getByRoomId(room.id);
    return bookings.some((booking) => {
      if (booking.status === "busy") return false;
      if (!checkIn || !checkOut) return true;
      return (
        new Date(booking.checkIn) <= new Date(checkIn) &&
        new Date(booking.checkOut) >= new Date(checkOut)
      );
    });
  },
};
