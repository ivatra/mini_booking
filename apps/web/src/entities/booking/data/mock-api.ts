import { MOCK_BOOKING } from "@shared";

import type { IApi } from "./types";

export const api: IApi = {
  getBookings: async ({ roomId }) => {
    const bookings = MOCK_BOOKING.filter((b) => b.roomId === roomId);

    await new Promise((resolve) => setTimeout(resolve, 250));

    return bookings;
  },
};
