import { analytics, getEnvVar } from "@shared";
import { create } from "zustand";

import { api } from "./api";
import type { IUseBookingsStore } from "./types";

export const useBookingsStore = create<IUseBookingsStore>((set, get) => ({
  bookings: [],
  subscriptions: new Map(),
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

      analytics.track("booking_action_succeeded", {
        bookingId,
        action: "book",
      });
    } catch (e) {
      analytics.track("booking_action_failed", {
        bookingId,
        action: "book",
        reason: e instanceof Error ? e.message : String(e),
      });

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

      if (!newBooking) {
        throw new Error("Не удалось создать бронирование");
      }

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

  subscribeToRoomBookingStatusChange: async (roomId: string) => {
    if (get().subscriptions.has(roomId)) return;

    const unsubscribe = await api.subscribeToRoomBookingStatusChange(
      roomId,
      (bookingId, status) => {
        get()._updateBookingStatus(bookingId, status);
      },
    );

    get().subscriptions.set(roomId, unsubscribe);
  },

  unSubscribeFromRoomBookingStatusChange: (roomId: string) => {
    const unsubscribe = get().subscriptions.get(roomId);

    if (unsubscribe) {
      unsubscribe();
      get().subscriptions.delete(roomId);
    }
  },

  unSubscribeFromAllRoomsBookingStatusChange: () => {
    get().subscriptions.forEach((unsubscribe) => unsubscribe());
    get().subscriptions.clear();
  },

  _updateBookingStatus: (bookingId, status) => {
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === bookingId ? { ...b, status } : b,
      ),
    }));
  },
}));
