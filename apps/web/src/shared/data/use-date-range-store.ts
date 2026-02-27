import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { TUiDatePickerInput } from "../types";

export interface IDateRangeStore {
  date: TUiDatePickerInput;
  setDate: (date: TUiDatePickerInput) => void;
}

export const useDateRangeStore = create<IDateRangeStore>()(
  persist(
    (set) => ({
      date: [null, null],
      setDate: (date) => set({ date }),
    }),
    {
      name: "date-range-storage",
    },
  ),
);
