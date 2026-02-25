import { isRangeOverlap, MOCK_BOOKING } from "@shared";

import type { IApi } from "./types";

export const api: IApi = {
  getBookings: async ({ roomId, date }) => {
    const bookings = MOCK_BOOKING.filter((b) => {
      if (b.roomId !== roomId) return false;
      if (!date) return true;

      return isRangeOverlap(date.checkIn, date.checkOut, b.checkIn, b.checkOut);
    });

    await new Promise((resolve) => setTimeout(resolve, 250));

    return bookings;
  },
};
