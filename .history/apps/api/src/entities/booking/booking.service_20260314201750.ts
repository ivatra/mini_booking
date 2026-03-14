import { prisma } from "infra/prisma.js";

import { createId } from "@common/helpers/id.js";
import { AppError } from "@common/http-error.js";

import type { RoomService } from "../room/room.service.js";

import type { Booking, CreateBookingInput } from "./booking.types.js";

export class BookingService {
  constructor(private readonly roomService: RoomService) {}

  public async list(): Promise<Booking[]> {
    const bookings = await prisma.booking.findMany();

    return bookings.map((booking) => ({
      id: booking.id,
      roomId: booking.roomId,
      checkIn: booking.checkIn.toISOString(),
      checkOut: booking.checkOut.toISOString(),
      status: booking.status,
      createdAt: booking.createdAt.toISOString(),
      updatedAt: booking.updatedAt.toISOString(),
    }));
  }

  public async getById(id: string): Promise<Booking | undefined> {
    const booking = await prisma.booking.findUnique({ where: { id } });

    if (!booking) {
      return undefined;
    }

    return {
      id: booking.id,
      roomId: booking.roomId,
      checkIn: booking.checkIn.toISOString(),
      checkOut: booking.checkOut.toISOString(),
      status: booking.status,
      createdAt: booking.createdAt.toISOString(),
      updatedAt: booking.updatedAt.toISOString(),
    };
  }

  public async getByRoomId(roomId: string): Promise<Booking[]> {
    const bookings = await prisma.booking.findMany({
      where: { roomId },
    });

    return bookings.map((booking) => ({
      id: booking.id,
      roomId: booking.roomId,
      checkIn: booking.checkIn.toISOString(),
      checkOut: booking.checkOut.toISOString(),
      status: booking.status,
      createdAt: booking.createdAt.toISOString(),
      updatedAt: booking.updatedAt.toISOString(),
    }));
  }

  public async create(payload: CreateBookingInput): Promise<Booking> {
    if (new Date(payload.checkIn) >= new Date(payload.checkOut)) {
      throw new AppError("checkIn must be earlier than checkOut", 400);
    }
    const room = await this.roomService.getById(payload.roomId);

    if (!room) {
      throw new AppError("Cannot create booking: room does not exist", 400);
    }

    const intersects = await prisma.booking.findFirst({
      where: {
        roomId: payload.roomId,
        checkIn: { lt: new Date(payload.checkOut) },
        checkOut: { gt: new Date(payload.checkIn) },
      },
    });

    if (intersects) {
      throw new AppError("Room is already booked for selected dates", 409);
    }

    const bookingId = createId("booking");

    const booking = await prisma.booking.create({
      data: {
        id: bookingId,
        roomId: payload.roomId,
        checkIn: new Date(payload.checkIn),
        checkOut: new Date(payload.checkOut),
        status: payload.status || "avaliable",
      },
    });

    return {
      id: booking.id,
      roomId: booking.roomId,
      guestName: payload.guestName,
      checkIn: booking.checkIn.toISOString(),
      checkOut: booking.checkOut.toISOString(),
      status: booking.status,
      createdAt: booking.createdAt.toISOString(),
      updatedAt: booking.updatedAt.toISOString(),
    } as Booking;
  }

  public async book(bookingId: string): Promise<void> {
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "busy" },
    });
  }

  public async cancelBook(bookingId: string): Promise<void> {
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "avaliable" },
    });
  }
}
