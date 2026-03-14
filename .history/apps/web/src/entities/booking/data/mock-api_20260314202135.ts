import { isRangeOverlap } from "@shared";
import { client } from "@shared/graphql/client";
import {
  CANCEL_BOOKING,
  CONFIRM_BOOKING,
  CREATE_BOOKING,
  GET_BOOKINGS_BY_ROOM,
} from "@shared/graphql/queries";

import type { IApi, IBooking, TBookingStatus } from "./types";

export const api: IApi = {
  getBookings: async ({ roomId, date }) => {
    try {
      const response = await client.query({
        query: GET_BOOKINGS_BY_ROOM,
        variables: { roomId },
      });
      const data = response.data as any;

      const bookings: IBooking[] = data.bookings.filter((b: any) => {
        if (!date) return true;

        return isRangeOverlap(
          date.checkIn,
          date.checkOut,
          b.checkIn,
          b.checkOut,
        );
      });

      return bookings;
    } catch (error) {
      throw error;
    }
  },

  book: async (bookingId: string) => {
    try {
      await client.mutate({
        mutation: CONFIRM_BOOKING,
        variables: { bookingId },
      });
    } catch (error) {
      throw new Error("Не удалось забронировать номер");
    }
  },

  cancelBook: async (bookingId: string) => {
    try {
      await client.mutate({
        mutation: CANCEL_BOOKING,
        variables: { bookingId },
      });
    } catch (error) {
      throw new Error("Не удалось отменить бронирование");
    }
  },

  createBooking: async ({ roomId, checkIn, checkOut, status }) => {
    try {
      const response = await client.mutate({
        mutation: CREATE_BOOKING,
        variables: {
          roomId,
          checkIn,
          checkOut,
        },
      });
      const data = response.data as any;

      return {
        id: data.createBooking.id,
        roomId: data.createBooking.roomId,
        checkIn: data.createBooking.checkIn,
        checkOut: data.createBooking.checkOut,
        status: status,
        createdAt: data.createBooking.createdAt,
      };
    } catch (error) {
      throw new Error(
        "Бронирования не должны пересекаться. В этот период уже есть бронь для этого номера",
      );
    }
  },

  subscribeToRoomBookingStatusChange: (
    _roomId: string,
    _onUpdate: (bookingId: string, status: TBookingStatus) => void,
  ) => {
    // Real-time subscription would use GraphQL subscriptions via WebSocket
    // For now, return a no-op unsubscribe function
    return () => {};
  },
};
