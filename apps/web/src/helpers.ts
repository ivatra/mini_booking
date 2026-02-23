import type { HotelRoom } from "./types";

export function pluralizeRu(
  count: number,
  one: string,
  few: string,
  many: string,
) {
  const n = Math.abs(count) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) return many;
  if (n1 > 1 && n1 < 5) return few;
  if (n1 === 1) return one;

  return many;
}

export function pickPreviewRooms(
  rooms: HotelRoom[],
  limit: number = 3,
): HotelRoom[] {
  const sorted = [...rooms];

  sorted.sort((a, b) => a.pricePerNight - b.pricePerNight);

  return sorted.slice(0, limit);
}

export function isRoomAvailableOnDate(
  room: HotelRoom,
  targetDate: Date = new Date(),
): boolean {
  return !room.bookings.some((booking) => {
    if (booking.status !== "busy") {
      return false;
    }

    const start = booking.checkIn.getTime();
    const end = booking.checkOut.getTime();
    const current = targetDate.getTime();

    return current >= start && current < end;
  });
}
