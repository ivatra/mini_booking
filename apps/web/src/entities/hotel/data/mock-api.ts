import { MOCK_HOTELS } from "@shared";

import type { IApi } from "./types";

export const api: IApi = {
  getHotels: async () => {
    await new Promise((resolve) => setTimeout(resolve, 250));

    return MOCK_HOTELS;
  },
};
