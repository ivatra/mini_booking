import type { Room } from "../generated/prisma/client";

export const MOCK_ROOMS: Omit<Room, "createdAt" | "updatedAt">[] = [
  {
    id: "room-101",
    hotelId: "hotel-1",
    name: "101",
    capacity: 2,
    pricePerNight: 6500,
  },
  {
    id: "room-102",
    hotelId: "hotel-1",
    name: "102",
    capacity: 3,
    pricePerNight: 7800,
  },
  {
    id: "room-103",
    hotelId: "hotel-1",
    name: "103",
    capacity: 1,
    pricePerNight: 5200,
  },
  {
    id: "room-104",
    hotelId: "hotel-1",
    name: "104",
    capacity: 1,
    pricePerNight: 5200,
  },
  {
    id: "room-201",
    hotelId: "hotel-2",
    name: "201",
    capacity: 2,
    pricePerNight: 7100,
  },
  {
    id: "room-202",
    hotelId: "hotel-2",
    name: "202 Deluxe",
    capacity: 4,
    pricePerNight: 11200,
  },
  {
    id: "room-203",
    hotelId: "hotel-2",
    name: "203",
    capacity: 1,
    pricePerNight: 4900,
  },
];
