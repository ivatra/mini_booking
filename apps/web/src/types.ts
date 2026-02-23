import type { ActionIconProps, PolymorphicComponentProps } from "@mantine/core";

export type TActionIconProps = PolymorphicComponentProps<
  "button",
  ActionIconProps
>;

export interface IBooking {
  id: string;
  checkIn: Date; // включительно
  checkOut: Date; // не включительно
  status: "avaliable" | "busy";
  guestName?: string;
  createdAt: string;
}

export interface HotelRoom {
  id: string;
  name: string; // "101", "Deluxe 202"
  capacity: number;
  pricePerNight: number;
  bookings: IBooking[];
}

export interface IHotel {
  id: string;
  name: string;
  city: string;
  address?: string;
  rooms: HotelRoom[];
}
