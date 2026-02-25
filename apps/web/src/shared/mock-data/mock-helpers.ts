export const isRangeOverlap = (
  userIn: string,
  userOut: string,
  bookingIn: string,
  bookingOut: string,
): boolean =>
  new Date(bookingIn) <= new Date(userIn) &&
  new Date(bookingOut) >= new Date(userOut);
