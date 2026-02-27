import { createStore } from "zustand/vanilla";

export type TSubscriptionStatus = "idle" | "connecting" | "connected" | "error";
export type TUnsubscribe = () => void;
export type TSubscribeFactory = () => TUnsubscribe | Promise<TUnsubscribe>;

export interface ISubscriptionStoreState {
  status: TSubscriptionStatus;
  error: string | null;
  unsubscribe: TUnsubscribe | null;
  updatedAt: number | null;
}

export interface ISubscriptionStore extends ISubscriptionStoreState {
  connect: (factory: TSubscribeFactory) => Promise<void>;
  disconnect: () => void;
  refresh: (factory: TSubscribeFactory) => Promise<void>;
}

export const createSubscriptionStore = () =>
  createStore<ISubscriptionStore>((set, get) => ({
    status: "idle",
    error: null,
    unsubscribe: null,
    updatedAt: null,

    connect: async (factory) => {
      if (get().unsubscribe) return;

      set({
        status: "connecting",
        error: null,
        updatedAt: Date.now(),
      });

      try {
        const unsubscribe = await factory();

        set({
          status: "connected",
          unsubscribe,
          error: null,
          updatedAt: Date.now(),
        });
      } catch (e) {
        set({
          status: "error",
          unsubscribe: null,
          error: e instanceof Error ? e.message : String(e),
          updatedAt: Date.now(),
        });
      }
    },

    disconnect: () => {
      get().unsubscribe?.();

      set({
        status: "idle",
        unsubscribe: null,
        updatedAt: Date.now(),
      });
    },

    refresh: async (factory) => {
      get().disconnect();
      await get().connect(factory);
    },
  }));
