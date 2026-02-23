import type { IHotel } from "./types";

export const mockHotels: IHotel[] = [
  {
    id: "hotel-1",
    name: "Aurora Отель",
    city: "Moscow",
    address: "Тверская, 10",
    rooms: [
      {
        id: "room-101",
        name: "101",
        capacity: 2,
        pricePerNight: 6500,
        bookings: [
          {
            id: "booking-1",
            checkIn: new Date("2026-03-02"),
            checkOut: new Date("2026-03-05"),
            status: "avaliable",
            createdAt: "2026-02-20T10:00:00.000Z",
          },
          {
            id: "booking-2",
            checkIn: new Date("2026-03-10"),
            checkOut: new Date("2026-03-13"),
            status: "busy",
            createdAt: "2026-02-20T10:05:00.000Z",
          },
        ],
      },
      {
        id: "room-102",
        name: "102",
        capacity: 3,
        pricePerNight: 7800,
        bookings: [
          {
            id: "booking-3",
            checkIn: new Date("2026-03-01"),
            checkOut: new Date("2026-03-04"),
            status: "busy",
            createdAt: "2026-02-20T10:10:00.000Z",
          },
          {
            id: "booking-4",
            checkIn: new Date("2026-03-18"),
            checkOut: new Date("2026-03-20"),
            status: "avaliable",
            createdAt: "2026-02-20T10:15:00.000Z",
          },
        ],
      },
      {
        id: "room-103",
        name: "103",
        capacity: 1,
        pricePerNight: 5200,
        bookings: [
          {
            id: "booking-5",
            checkIn: new Date("2026-03-07"),
            checkOut: new Date("2026-03-08"),
            status: "busy",
            createdAt: "2026-02-20T10:20:00.000Z",
          },
        ],
      },
    ],
  },
  {
    id: "hotel-2",
    name: "Отель Нева",
    city: "Санкт Петербург",
    address: "Невский проспект, 25",
    rooms: [
      {
        id: "room-201",
        name: "201",
        capacity: 2,
        pricePerNight: 7100,
        bookings: [
          {
            id: "booking-6",
            checkIn: new Date("2026-03-03"),
            checkOut: new Date("2026-03-06"),
            status: "avaliable",
            createdAt: "2026-02-20T10:25:00.000Z",
          },
        ],
      },
      {
        id: "room-202",
        name: "202 Deluxe",
        capacity: 4,
        pricePerNight: 11200,
        bookings: [
          {
            id: "booking-7",
            checkIn: new Date("2026-03-05"),
            checkOut: new Date("2026-03-09"),
            status: "avaliable",
            createdAt: "2026-02-20T10:30:00.000Z",
          },
          {
            id: "booking-8",
            checkIn: new Date("2026-03-14"),
            checkOut: new Date("2026-03-16"),
            status: "busy",
            createdAt: "2026-02-20T10:35:00.000Z",
          },
        ],
      },
      {
        id: "room-203",
        name: "203",
        capacity: 1,
        pricePerNight: 4900,
        bookings: [
          {
            id: "booking-9",
            checkIn: new Date("2026-03-11"),
            checkOut: new Date("2026-03-12"),
            status: "avaliable",
            createdAt: "2026-02-20T10:40:00.000Z",
          },
        ],
      },
    ],
  },
];
