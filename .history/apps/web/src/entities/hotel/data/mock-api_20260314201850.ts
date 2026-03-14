import { client } from "@shared/graphql/client";
import { GET_HOTELS } from "@shared/graphql/queries";
import type { IApi, IHotel } from "./types";

export const api: IApi = {
  getHotels: async () => {
    try {
      const { data } = await client.query({
        query: GET_HOTELS,
      });

      // Transform the API response to match the expected frontend format
      const hotels: IHotel[] = data.hotels.map(
        (
          hotel: Omit<IHotel, "roomsLength"> & { rooms?: Array<{ id: string }> },
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
