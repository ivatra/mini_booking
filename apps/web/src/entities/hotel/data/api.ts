import { client, getEnvVar } from "@shared";

import { api as MOCK_API } from "./mock-api";
import { GET_HOTELS } from "./queries";
import type { IApi } from "./types";

export const api: IApi = Number(getEnvVar("VITE_MOCK"))
  ? MOCK_API
  : {
      getHotels: async () => {
        const response = await client.query({
          query: GET_HOTELS,
        });

        const data = response.data;

        if (!data?.hotels) return [];

        const hotels = data.hotels.map((hotel) => ({
          id: hotel.id,
          name: hotel.name,
          city: hotel.city,
          address: hotel.address || "",
          roomsLength: hotel.roomsCount,
        }));

        return hotels;
      },
    };
