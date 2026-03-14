import { client } from "@shared/graphql/client";
import { GET_BOOKINGS_BY_ROOM, GET_ROOMS } from "@shared/graphql/queries";
import { isRangeOverlap } from "@shared";

import type { IApi, IRoom } from "./types";

export const api: IApi = {
  getRooms: async (params) => {
    const { range, hotelId } = params;

    try {
      const { data } = await client.query({
        query: GET_ROOMS,
        variables: { hotelId },
      });

      const rooms: IRoom[] = await Promise.all(
        data.rooms.map(async (room: any) => {
          // Fetch bookings for this room
          const { data: bookingsData } = await client.query({
            query: GET_BOOKINGS_BY_ROOM,
            variables: { roomId: room.id },
          });

          const bookings = bookingsData.bookings;
          const hasAvaliableBooking = bookings.some((booking: any) => {
            if (booking.status === "busy") return false;

            if (!range) return true;

            return isRangeOverlap(
              new Date(range.checkIn),
              new Date(range.checkOut),
              new Date(booking.checkIn),
              new Date(booking.checkOut),
            );
          });

          return {
            id: room.id,
            hotelId: room.hotelId,
            name: room.name,
            capacity: room.capacity,
            pricePerNight: room.pricePerNight,
            hasAvaliableBooking,
          };
        }),
      );

      return rooms.sort((a, b) => {
        return Number(b.hasAvaliableBooking) - Number(a.hasAvaliableBooking);
      });
    } catch (error) {
      throw error;
    }
  },

  getRoomById: async (id) => {
    try {
      const { data } = await client.query({
        query: `
          query GetRoom($id: ID!) {
            room(id: $id) {
              id
              hotelId
              name
              capacity
              pricePerNight
              bookings {
                id
                status
                checkIn
                checkOut
              }
            }
          }
        `,
        variables: { id },
      });

      const room = data.room;
      if (!room) return null;

      const hasAvaliableBooking = room.bookings.some((booking: any) => {
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
    } catch (error) {
      return null;
    }
  },
};
