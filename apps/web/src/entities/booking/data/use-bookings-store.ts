import { getEnvVar } from "@shared";
import { create } from "zustand";

import { api } from "./mock-api";
import type { IUseBookingsStore } from "./types";

export const useBookingsStore = create<IUseBookingsStore>((set) => ({
  bookings: [],
  loading: 0,
  error: null,

  getBookings: async (params) => {
    set((st) => ({ loading: st.loading + 1, error: null }));

    try {
      const bookings = await api.getBookings(params);

      set({ bookings });
    } catch (e) {
      if (getEnvVar("DEV")) {
        console.warn(
          e instanceof Error
            ? e.message
            : `Не удалось получить сообщение об ошибке ${e}`,
        );
      }

      set({
        error:
          e instanceof Error ? e.message : "Не удалось загрузить бронирования",
      });
    } finally {
      set((st) => ({ loading: st.loading - 1 }));
    }
  },

  book: async (bookingId) => {
    try {
      await api.book(bookingId);

      set((st) => ({
        bookings: st.bookings.map((b) =>
          b.id === bookingId ? { ...b, status: "busy" } : b,
        ),
      }));
    } catch (e) {
      if (getEnvVar("DEV")) {
        console.warn(
          e instanceof Error ? e.message : `Не удалось забронировать ${e}`,
        );
      }
    }
  },

  cancelBook: async (bookingId) => {
    try {
      await api.cancelBook(bookingId);

      set((st) => ({
        bookings: st.bookings.map((b) =>
          b.id === bookingId ? { ...b, status: "avaliable" } : b,
        ),
      }));
    } catch (e) {
      if (getEnvVar("DEV")) {
        console.warn(
          e instanceof Error
            ? e.message
            : `Не удалось отменить бронирование ${e}`,
        );
      }
    }
  },
  createBooking: async (params) => {
    try {
      const newBooking = await api.createBooking(params);

      set((st) => ({
        bookings: [...st.bookings, newBooking],
      }));

      return newBooking;
    } catch (e) {
      if (getEnvVar("DEV")) {
        console.warn(
          e instanceof Error ? e.message : "Не удалось создать бронирование",
        );
      }

      throw e;
    }
  },
}));
