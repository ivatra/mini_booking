import { createId } from "@common/helpers/id.js";
import { AppError } from "@common/http-error.js";
import { bookingsStore } from "@common/store.js";

import type { HotelService } from "@entities/hotel/hotel.service.js";

import type { RoomService } from "../room/room.service.js";

import { hasDateOverlap } from "./booking.helpers.js";
import type { Booking, CreateBookingInput } from "./booking.types.js";

export class BookingService {
  constructor(
    private readonly roomService: RoomService,
    private readonly hotelService: HotelService,
  ) {}

  public list(): Booking[] {
    return bookingsStore;
  }

  public create(payload: CreateBookingInput): Booking {
    if (new Date(payload.checkIn) >= new Date(payload.checkOut)) {
      throw new AppError("checkIn must be earlier than checkOut", 400);
    }
    this.hotelService.getAll();
    const room = this.roomService.getById(payload.roomId);

    if (!room) {
      throw new AppError("Cannot create booking: room does not exist", 400);
    }

    const roomBookings = bookingsStore.filter(
      (booking) => booking.roomId === payload.roomId,
    );

    const intersects = roomBookings.some((booking) =>
      hasDateOverlap(
        booking.checkIn,
        booking.checkOut,
        payload.checkIn,
        payload.checkOut,
      ),
    );

    if (intersects) {
      throw new AppError("Room is already booked for selected dates", 409);
    }

    const booking: Booking = {
      id: createId("booking"),
      ...payload,
      createdAt: new Date().toISOString(),
    };

    bookingsStore.push(booking);

    return booking;
  }
}
