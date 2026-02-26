import { isRangeOverlap, MOCK_BOOKING } from "@shared";

import { generateId } from "./helpers";
import type { IApi, IBooking, TBookingStatus } from "./types";

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
    const hasConflict = MOCK_BOOKING.some((booking) => {
      if (booking.roomId !== roomId) return false;

      return isRangeOverlap(
        checkIn,
        checkOut,
        booking.checkIn,
        booking.checkOut,
      );
    });

    if (hasConflict) {
      throw new Error(
        "Бронирования не должны пересекаться. В этот период уже есть бронь для этого номера",
      );
    }

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

  subscribeToRoomBookingStatusChange: (
    roomId: string,
    onUpdate: (bookingId: string, status: TBookingStatus) => void,
  ) => {
    const interval = setInterval(() => {
      const roomBookings = MOCK_BOOKING.filter((b) => b.roomId === roomId);

      if (roomBookings.length === 0) return;

      const randomIndex = Math.floor(Math.random() * roomBookings.length);
      const randomBooking = roomBookings[randomIndex];

      const newStatus = randomBooking.status === "busy" ? "avaliable" : "busy";

      randomBooking.status = newStatus;

      console.log(
        `[MOCK] Booking ${randomBooking.id} status changed to ${newStatus}`,
      );

      onUpdate(randomBooking.id, newStatus);
    }, 30000);

    console.log(`[MOCK] Subscribed to room ${roomId}`);

    return () => {
      console.log(`[MOCK] Unsubscribed from room ${roomId}`);
      clearInterval(interval);
    };
  },
};
