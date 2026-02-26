// src/entities/booking/data/modal-store.ts
import { create } from "zustand";

import type { CreateBookingModalStore } from "./types";

export const useManageBookingModalStore = create<CreateBookingModalStore>(
  (set) => ({
    isOpen: false,

    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
  }),
);
