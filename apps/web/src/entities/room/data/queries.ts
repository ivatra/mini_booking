import { graphql } from "@graphql";

export const GET_ROOMS = graphql(`
  query GetRooms($hotelId: ID!, $checkIn: String, $checkOut: String) {
    rooms(hotelId: $hotelId) {
      id
      name
      capacity
      pricePerNight
      hotelId
      createdAt
      isAvailable(checkIn: $checkIn, checkOut: $checkOut)
    }
  }
`);

export const GET_ROOM = graphql(`
  query GetRoom($id: ID!) {
    room(id: $id) {
      id
      name
      capacity
      pricePerNight
      hotelId
      createdAt
      isAvailable
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
`);

export const GET_BOOKINGS_BY_ROOM = graphql(`
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
`);
