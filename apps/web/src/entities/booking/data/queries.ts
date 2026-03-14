import { graphql } from "@graphql";

export const CREATE_BOOKING = graphql(`
  mutation CreateBooking($roomId: ID!, $checkIn: String!, $checkOut: String!) {
    createBooking(roomId: $roomId, checkIn: $checkIn, checkOut: $checkOut) {
      id
      roomId
      checkIn
      checkOut
      status
      createdAt
    }
  }
`);

export const CANCEL_BOOKING = graphql(`
  mutation CancelBooking($bookingId: ID!) {
    cancelBooking(bookingId: $bookingId)
  }
`);

export const CONFIRM_BOOKING = graphql(`
  mutation ConfirmBooking($bookingId: ID!) {
    confirmBooking(bookingId: $bookingId)
  }
`);

export const BOOKING_STATUS_CHANGED = graphql(`
  subscription BookingStatusChanged($roomId: ID!) {
    bookingStatusChanged(roomId: $roomId) {
      id
      roomId
      checkIn
      checkOut
      status
      createdAt
      updatedAt
    }
  }
`);
