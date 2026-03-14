import type { GetHotelsQuery } from "@graphql";
import { client, getEnvVar } from "@shared";

import { api as MOCK_API } from "./mock-api";
import { GET_HOTELS } from "./queries";
import type { IApi, IHotel } from "./types";

export const api: IApi = Number(getEnvVar("VITE_MOCK"))
  ? MOCK_API
  : {
      getHotels: async () => {
        const response = await client.query<GetHotelsQuery>({
          query: GET_HOTELS,
        });
        const data = response.data;

        if (!data?.hotels) return [];

        const hotels: IHotel[] = data.hotels.map(
          (hotel: GetHotelsQuery["hotels"][0]) => ({
            id: hotel.id,
            name: hotel.name,
            city: hotel.city,
            address: hotel.address || "",
            roomsLength: 0,
          }),
        );

        return hotels;
      },
    };
