import type { DatesRangeValue, DateValue } from "@mantine/dates";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DateRangeStore {
  date: DatesRangeValue<DateValue>;
  setDate: (date: DatesRangeValue<DateValue>) => void;
}

const useDateRangeStore = create<DateRangeStore>()(
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

export default useDateRangeStore;
