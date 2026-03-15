import { GET_BOOKINGS_BY_ROOM } from "@entities";
import type {
  GetBookingsQuery,
  CreateBookingMutation,
  ConfirmBookingMutation,
  CancelBookingMutation,
} from "@graphql";
import { client, getEnvVar, isRangeOverlap } from "@shared";

import { api as MOCK_API } from "./mock-api";
import {
  CONFIRM_BOOKING,
  CANCEL_BOOKING,
  CREATE_BOOKING,
  BOOKING_STATUS_CHANGED,
} from "./queries";
import type { IApi, IBooking, TBookingStatus } from "./types";

export const api: IApi = Number(getEnvVar("VITE_MOCK"))
  ? MOCK_API
  : {
      getBookings: async ({ roomId, date }) => {
        const response = await client.query<GetBookingsQuery>({
          query: GET_BOOKINGS_BY_ROOM,
          variables: { roomId },
        });
        const data = response.data;

        if (!data?.bookings) return [];

        const bookings: IBooking[] = data.bookings.filter(
          (b: GetBookingsQuery["bookings"][0]) => {
            if (!date) return true;

            return isRangeOverlap(
              date.checkIn,
              date.checkOut,
              b.checkIn,
              b.checkOut,
            );
          },
        );

        return bookings;
      },
      book: async (bookingId: string) => {
        await client.mutate<ConfirmBookingMutation>({
          mutation: CONFIRM_BOOKING,
          variables: { bookingId },
        });
      },

      cancelBook: async (bookingId: string) => {
        await client.mutate<CancelBookingMutation>({
          mutation: CANCEL_BOOKING,
          variables: { bookingId },
        });
      },

      createBooking: async ({ roomId, checkIn, checkOut, status }) => {
        const response = await client.mutate<CreateBookingMutation>({
          mutation: CREATE_BOOKING,
          variables: {
            roomId,
            checkIn,
            checkOut,
          },
        });

        if (!response.data) return undefined;

        const data = response.data;

        return {
          id: data.createBooking.id,
          roomId: data.createBooking.roomId,
          checkIn: data.createBooking.checkIn,
          checkOut: data.createBooking.checkOut,
          status: status,
          createdAt: data.createBooking.createdAt,
        };
      },

      subscribeToRoomBookingStatusChange: async (
        roomId: string,
        onUpdate: (bookingId: string, status: TBookingStatus) => void,
      ) => {
        // Subscribe to real-time booking status changes via GraphQL WebSocket
        const subscription = client
          .subscribe({
            query: BOOKING_STATUS_CHANGED,
            variables: { roomId },
          })
          .subscribe({
            next: (result) => {
              if (result.data?.bookingStatusChanged) {
                const booking = result.data.bookingStatusChanged;

                onUpdate(booking.id, booking.status as TBookingStatus);
              }
            },
            error: (err) => {
              if (getEnvVar("DEV")) {
                console.error("Subscription error:", err);
              }
            },
          });

        console.log(`Subscribed to booking status changes for room ${roomId}`);

        return () => {
          subscription.unsubscribe();

          console.log(
            `Unsubscribed from booking status changes for room ${roomId}`,
          );
        };
      },
    };
