import { graphql } from "@graphql";

export const GET_HOTELS = graphql(`
  query GetHotels {
    hotels {
      id
      name
      city
      address
      createdAt
    }
  }
`);

export const GET_HOTEL = graphql(`
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
`);
