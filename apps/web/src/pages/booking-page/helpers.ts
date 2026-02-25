export function isDateValid(
  checkIn: string | null,
  checkOut: string | null,
): boolean {
  return !!checkIn && !!checkOut;
}
