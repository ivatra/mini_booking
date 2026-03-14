import type { Booking } from "../generated/prisma/client";

export const MOCK_BOOKING: Omit<Booking, "createdAt" | "updatedAt">[] = [
  {
    id: "booking-1",
    roomId: "room-101",
    checkIn: new Date("2026-03-02"),
    checkOut: new Date("2026-03-05"),
    status: "avaliable",
  },
  {
    id: "booking-2",
    roomId: "room-101",
    checkIn: new Date("2026-03-10"),
    checkOut: new Date("2026-03-13"),
    status: "busy",
  },
  {
    id: "booking-3",
    roomId: "room-102",
    checkIn: new Date("2026-03-01"),
    checkOut: new Date("2026-03-04"),
    status: "busy",
  },
  {
    id: "booking-4",
    roomId: "room-104",
    checkIn: new Date("2026-03-18"),
    checkOut: new Date("2026-03-20"),
    status: "avaliable",
  },
  {
    id: "booking-5",
    roomId: "room-103",
    checkIn: new Date("2026-03-07"),
    checkOut: new Date("2026-03-08"),
    status: "busy",
  },
  {
    id: "booking-6",
    roomId: "room-201",
    checkIn: new Date("2026-03-03"),
    checkOut: new Date("2026-03-06"),
    status: "avaliable",
  },
  {
    id: "booking-7",
    roomId: "room-202",
    checkIn: new Date("2026-03-05"),
    checkOut: new Date("2026-03-09"),
    status: "avaliable",
  },
  {
    id: "booking-8",
    roomId: "room-202",
    checkIn: new Date("2026-03-14"),
    checkOut: new Date("2026-03-16"),
    status: "busy",
  },
  {
    id: "booking-9",
    roomId: "room-203",
    checkIn: new Date("2026-03-11"),
    checkOut: new Date("2026-03-12"),
    status: "avaliable",
  },
];
