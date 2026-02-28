import type { Booking } from "@entities/booking/booking.types.js";
import type { Hotel } from "@entities/hotel/hotel.types.js";
import type { Room } from "@entities/room/room.types.js";

export const hotelsStore: Hotel[] = [
  {
    id: "hotel_1",
    name: "Arctic View",
    city: "Krasnoyarsk",
    address: "Lenina 12",
    createdAt: new Date().toISOString(),
  },
];

export const roomsStore: Room[] = [
  {
    id: "room_1",
    hotelId: "hotel_1",
    title: "Standard Twin",
    capacity: 2,
    pricePerNight: 3800,
    createdAt: new Date().toISOString(),
  },
];

export const bookingsStore: Booking[] = [];
