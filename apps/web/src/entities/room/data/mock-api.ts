import { MOCK_BOOKING, MOCK_ROOMS } from "@shared";

import type { IApi } from "./types";

const isRangeOverlap = (
  aStart: string,
  aEnd: string,
  bStart: string,
  bEnd: string,
): boolean =>
  new Date(aStart) < new Date(bEnd) && new Date(aEnd) > new Date(bStart);

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
};
