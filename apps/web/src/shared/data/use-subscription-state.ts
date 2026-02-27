import type { StoreApi } from "zustand";
import { useStore } from "zustand";

import {
  createSubscriptionStore,
  type ISubscriptionStore,
} from "./use-subscriptions-store";

const inactiveSubscriptionStore = createSubscriptionStore();

export const useSubscriptionState = (
  store?: StoreApi<ISubscriptionStore> | null,
) => useStore(store ?? inactiveSubscriptionStore, (state) => state);
