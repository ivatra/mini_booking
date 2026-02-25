import { getEnvVar } from "@shared";
import { create } from "zustand";

import { api } from "./mock-api";
import type { IRoomsState } from "./types";

export const useRooms = create<IRoomsState>((set) => ({
  rooms: [],
  loading: 0,
  error: null,

  getRooms: async (params) => {
    set((st) => ({ loading: st.loading + 1, error: null }));

    try {
      const rooms = await api.getRooms(params);

      set({ rooms });
    } catch (e) {
      if (getEnvVar("DEV")) {
        console.warn(
          e instanceof Error
            ? e.message
            : `Не удалось получить сообщение об ошибке ${e}`,
        );
      }

      set({
        error: e instanceof Error ? e.message : "Не удалось загрузить комнаты",
      });
    } finally {
      set((st) => ({ loading: st.loading - 1 }));
    }
  },
}));
