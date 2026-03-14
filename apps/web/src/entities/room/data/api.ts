import { client, getEnvVar } from "@shared";

import { api as MOCK_API } from "./mock-api";
import { GET_ROOMS, GET_ROOM } from "./queries";
import type { IApi, IRoom } from "./types";
import type {
  GetRoomsQuery,
  GetRoomQuery,
} from "../../../generated/graphql/graphql";

export const api: IApi = Number(getEnvVar("VITE_MOCK"))
  ? MOCK_API
  : {
      getRooms: async (params) => {
        const { range, hotelId } = params;

        const response = await client.query<GetRoomsQuery>({
          query: GET_ROOMS,
          variables: {
            hotelId,
            checkIn: range?.checkIn,
            checkOut: range?.checkOut,
          },
        });
        const data = response.data;

        if (!data?.rooms) return [];

        const rooms: IRoom[] = await Promise.all(
          data.rooms.map(async (room: GetRoomsQuery["rooms"][0]) => {
            return {
              id: room.id,
              hotelId: room.hotelId,
              name: room.name,
              capacity: room.capacity,
              pricePerNight: room.pricePerNight,
              hasAvaliableBooking: room.isAvailable,
            };
          }),
        );

        return rooms.sort((a, b) => {
          return Number(b.hasAvaliableBooking) - Number(a.hasAvaliableBooking);
        });
      },

      getRoomById: async (id) => {
        const response = await client.query<GetRoomQuery>({
          query: GET_ROOM,
          variables: { id },
        });
        const data = response.data;
        const room = data?.room;

        if (!room) return null;

        const hasAvaliableBooking = (room.bookings || []).some((booking) => {
          return booking.status !== "busy";
        });

        return {
          id: room.id,
          hotelId: room.hotelId,
          name: room.name,
          capacity: room.capacity,
          pricePerNight: room.pricePerNight,
          hasAvaliableBooking,
        };
      },
    };
