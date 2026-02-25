import { MOCK_BOOKING, MOCK_ROOMS } from "@shared";

import type { IApi } from "./types";

const isRangeOverlap = (
  userIn: string,
  userOut: string,
  bookingIn: string,
  bookingOut: string,
): boolean =>
  new Date(bookingIn) <= new Date(userIn) &&
  new Date(bookingOut) >= new Date(userOut);

export const api: IApi = {
  getRooms: async (params) => {
    const { range, hotelId } = params;

    const rooms = MOCK_ROOMS.filter((room) => room.hotelId === hotelId);

    await new Promise((resolve) => setTimeout(resolve, 250));

    return rooms.map((room) => {
      const hasAvaliableBooking = MOCK_BOOKING.some((booking) => {
        if (booking.roomId !== room.id || booking.status === "busy")
          return false;

        if (!range) return true;

        console.log(
          room.id,
          {
            myRange: [range.checkIn, range.checkOut],
            bookingRange: [booking.checkIn, booking.checkOut],
          },
          isRangeOverlap(
            range.checkIn,
            range.checkOut,
            booking.checkIn,
            booking.checkOut,
          ),
        );

        return isRangeOverlap(
          range.checkIn,
          range.checkOut,
          booking.checkIn,
          booking.checkOut,
        );
      });

      return {
        ...room,
        hasAvaliableBooking,
      };
    });
  },
  getRoomById: async (id) => {
    const room = MOCK_ROOMS.find((r) => r.id === id);

    if (!room) return null;

    await new Promise((resolve) => setTimeout(resolve, 250));

    const hasAvaliableBooking = MOCK_BOOKING.some((booking) => {
      if (booking.roomId !== room.id || booking.status === "busy") return false;

      return true;
    });

    return {
      ...room,
      hasAvaliableBooking,
    };
  },
};
