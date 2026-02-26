import { useBookingsStore } from "@entities";
import { MOCK_BOOKING } from "@shared";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const cloneBooking = () => MOCK_BOOKING.map((booking) => ({ ...booking }));

const initialMockBooking = cloneBooking();

describe("useBookingsStore and mock-api", () => {
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

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("gets bookings from mock-api and stores array with id field", async () => {
    await useBookingsStore.getState().getBookings({ roomId: "room-101" });

    const { bookings } = useBookingsStore.getState();

    expect(Array.isArray(bookings)).toBe(true);
    expect(bookings.length).toBeGreaterThan(0);
    expect(bookings.every((booking) => typeof booking.id === "string")).toBe(
      true,
    );
  });

  it('handles mock-api error on book("unknown-id")', async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    await useBookingsStore.getState().book("unknown-id");

    expect(warnSpy).toHaveBeenCalledWith("Бронирование не найдено");
    expect(useBookingsStore.getState().bookings).toHaveLength(0);
  });

  it("updates booking status after subscribeToRoomBookingStatusChange", async () => {
    await useBookingsStore.getState().getBookings({ roomId: "room-101" });

    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0);

    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0);

    useBookingsStore.getState().subscribeToRoomBookingStatusChange("room-101");

    await vi.advanceTimersByTimeAsync(30001);

    const beforeStatus = useBookingsStore
      .getState()
      .bookings.find((booking) => booking.id === "booking-1")?.status;

    useBookingsStore.getState().subscribeToRoomBookingStatusChange("room-101");
    await vi.advanceTimersByTimeAsync(30001);

    const afterStatus = useBookingsStore
      .getState()
      .bookings.find((booking) => booking.id === "booking-1")?.status;

    expect(beforeStatus).toBeDefined();
    expect(afterStatus).toBeDefined();
    expect(afterStatus).not.toBe(beforeStatus);

    useBookingsStore
      .getState()
      .unSubscribeFromRoomBookingStatusChange("room-101");
  });
});
