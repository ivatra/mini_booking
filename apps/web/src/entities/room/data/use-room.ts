import { useState } from "react";
import { create } from "zustand";

import { api } from "./mock-api";
import type { IRoomState } from "./types";

export const useRoom = () => {
  const [store] = useState(() =>
    create<IRoomState>((set) => ({
      room: null,
      loading: 0,
      error: null,

      getRoom: async (id) => {
        set((st) => ({ loading: st.loading + 1, error: null }));

        try {
          const room = await api.getRoomById(id);

          set({ room });
        } catch (e) {
          set({
            error:
              e instanceof Error ? e.message : "Не удалось загрузить комнату",
          });
        } finally {
          set((st) => ({ loading: st.loading - 1 }));
        }
      },
    })),
  );

  return store();
};
