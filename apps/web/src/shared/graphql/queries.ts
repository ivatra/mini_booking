import { gql } from "@apollo/client";

export const GET_HOTELS = gql`
  query GetHotels {
    hotels {
      id
      name
      city
      address
      createdAt
    }
  }
`;

export const GET_HOTEL = gql`
  query GetHotel($id: ID!) {
    hotel(id: $id) {
      id
      name
      city
      address
      createdAt
      rooms {
        id
        name
        capacity
        pricePerNight
        hotelId
        createdAt
      }
    }
  }
`;

export const GET_ROOMS = gql`
  query GetRooms($hotelId: ID!) {
    rooms(hotelId: $hotelId) {
      id
      name
      capacity
      pricePerNight
      hotelId
      createdAt
    }
  }
`;

export const GET_ROOM = gql`
  query GetRoom($id: ID!) {
    room(id: $id) {
      id
      name
      capacity
      pricePerNight
      hotelId
      createdAt
      hotel {
        id
        name
        city
      }
      bookings {
        id
        checkIn
        checkOut
        status
      }
    }
  }
`;

export const GET_BOOKINGS_BY_ROOM = gql`
  query GetBookings($roomId: ID!) {
    bookings(roomId: $roomId) {
      id
      roomId
      checkIn
      checkOut
      status
      createdAt
    }
  }
`;

export const CREATE_BOOKING = gql`
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
`;

export const CANCEL_BOOKING = gql`
  mutation CancelBooking($bookingId: ID!) {
    cancelBooking(bookingId: $bookingId)
  }
`;

export const CONFIRM_BOOKING = gql`
  mutation ConfirmBooking($bookingId: ID!) {
    confirmBooking(bookingId: $bookingId)
  }
`;
