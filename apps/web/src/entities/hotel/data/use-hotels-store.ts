import { getEnvVar } from "@shared";
import { create } from "zustand";

import { api } from "./api";
import type { IUseHotelsStore } from "./types";

export const useHotelsStore = create<IUseHotelsStore>((set) => ({
  hotels: [],
  loading: 0,
  error: null,

  getHotels: async () => {
    set((st) => ({ loading: st.loading + 1, error: null }));

    try {
      const hotels = await api.getHotels();

      set({ hotels });
    } catch (e) {
      if (getEnvVar("DEV")) {
        console.warn(
          e instanceof Error
            ? e.message
            : `Не удалось получить сообщение об ошибке ${e}`,
        );
      }

      set({
        error: e instanceof Error ? e.message : "Не удалось загрузить отели",
      });
    } finally {
      set((st) => ({ loading: st.loading - 1 }));
    }
  },
}));
