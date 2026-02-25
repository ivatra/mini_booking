import { getEnvVar } from "@shared";
import { create } from "zustand";

import { api } from "./mock-api";
import type { IBookingsState } from "./types";

export const useBookings = create<IBookingsState>((set) => ({
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
}));
