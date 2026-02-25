import { isRangeOverlap, MOCK_BOOKING } from "@shared";

import { generateId } from "./helpers";
import type { IApi, IBooking } from "./types";

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
  book: async (bookingId: string) => {
    const booking = MOCK_BOOKING.find((b) => b.id === bookingId);

    if (!booking) throw new Error("Бронирование не найдено");

    booking.status = "busy";
    await new Promise((resolve) => setTimeout(resolve, 300));
  },

  cancelBook: async (bookingId: string) => {
    const booking = MOCK_BOOKING.find((b) => b.id === bookingId);

    if (!booking) throw new Error("Бронирование не найдено");

    booking.status = "avaliable";
    await new Promise((resolve) => setTimeout(resolve, 300));
  },

  createBooking: async ({ roomId, checkIn, checkOut, status }) => {
    const newBooking: IBooking = {
      id: generateId(),
      roomId,
      checkIn,
      checkOut,
      status,
      createdAt: new Date().toISOString(),
    };

    MOCK_BOOKING.push(newBooking);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return newBooking;
  },
};
