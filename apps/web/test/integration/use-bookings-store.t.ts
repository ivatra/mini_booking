import { useBookingsStore } from "@entities";
import { MOCK_BOOKING } from "@shared";
import { beforeEach, describe, expect, it } from "vitest";

const cloneBooking = () => MOCK_BOOKING.map((booking) => ({ ...booking }));

const initialMockBooking = cloneBooking();

describe("useBookingsStore integration", () => {
  beforeEach(() => {
    MOCK_BOOKING.splice(
      0,
      MOCK_BOOKING.length,
      ...initialMockBooking.map((b) => ({ ...b })),
    );

    useBookingsStore.setState({
      bookings: [],
      subscriptions: new Map(),
      loading: 0,
      error: null,
    });
  });

  it("loads room bookings and toggles booking status via API", async () => {
    const store = useBookingsStore.getState();

    await store.getBookings({ roomId: "room-101" });

    const loaded = useBookingsStore
      .getState()
      .bookings.find((booking) => booking.id === "booking-1");

    expect(loaded).toBeDefined();
    expect(loaded?.status).toBe("avaliable");

    await useBookingsStore.getState().book("booking-1");

    expect(
      useBookingsStore
        .getState()
        .bookings.find((booking) => booking.id === "booking-1")?.status,
    ).toBe("busy");

    await useBookingsStore.getState().cancelBook("booking-1");

    expect(
      useBookingsStore
        .getState()
        .bookings.find((booking) => booking.id === "booking-1")?.status,
    ).toBe("avaliable");
  });

  it("creates booking without date conflict and adds it to store", async () => {
    const created = await useBookingsStore.getState().createBooking({
      roomId: "room-101",
      checkIn: new Date("2026-03-06").toISOString(),
      checkOut: new Date("2026-03-09").toISOString(),
      status: "avaliable",
    });

    expect(created.id).toBeTruthy();
    expect(
      useBookingsStore
        .getState()
        .bookings.some((booking) => booking.id === created.id),
    ).toBe(true);
  });

  it("throws error for conflicting booking range and does not mutate store", async () => {
    await expect(
      useBookingsStore.getState().createBooking({
        roomId: "room-101",
        checkIn: new Date("2026-03-03").toISOString(),
        checkOut: new Date("2026-03-04").toISOString(),
        status: "avaliable",
      }),
    ).rejects.toThrow();

    expect(useBookingsStore.getState().bookings).toHaveLength(0);
  });
});
