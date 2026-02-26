import { describe, expect, it } from "vitest";

import { api as bookingsApi } from "../../../src/entities/booking/data/mock-api";
import { api as hotelsApi } from "../../../src/entities/hotel/data/mock-api";
import { api as roomsApi } from "../../../src/entities/room/data/mock-api";

describe("mock api integration", () => {
  it("returns bookings array with id field", async () => {
    const bookings = await bookingsApi.getBookings({ roomId: "room-101" });

    expect(Array.isArray(bookings)).toBe(true);
    expect(bookings.length).toBeGreaterThan(0);
    expect(bookings.every((item) => typeof item.id === "string")).toBe(true);
  });

  it("returns rooms array with id field", async () => {
    const rooms = await roomsApi.getRooms({ hotelId: "hotel-1" });

    expect(Array.isArray(rooms)).toBe(true);
    expect(rooms.length).toBeGreaterThan(0);
    expect(rooms.every((item) => typeof item.id === "string")).toBe(true);
  });

  it("returns hotels array with id field", async () => {
    const hotels = await hotelsApi.getHotels();

    expect(Array.isArray(hotels)).toBe(true);
    expect(hotels.length).toBeGreaterThan(0);
    expect(hotels.every((item) => typeof item.id === "string")).toBe(true);
  });
});
