import { GET_HOTELS } from "@shared/graphql/queries";

import type { IApi, IHotel } from "./types";

export const createHotelApi = (): IApi => {
  return {
    getHotels: async () => {
      try {
        const { data, error } = await import("@shared/graphql/client").then(
          ({ client }) =>
            client.query({
              query: GET_HOTELS,
            }),
        );

        if (error) {
          throw new Error(error.message);
        }

        // Transform the API response to match the expected frontend format
        const hotels: IHotel[] = data.hotels.map(
          (
            hotel: Omit<IHotel, "roomsLength"> & {
              rooms?: Array<{ id: string }>;
            },
          ) => ({
            id: hotel.id,
            name: hotel.name,
            city: hotel.city,
            address: hotel.address || "",
            roomsLength: hotel.rooms?.length || 0,
          }),
        );

        return hotels;
      } catch (error) {
        throw error;
      }
    },
  };
};

export const api: IApi = createHotelApi();
