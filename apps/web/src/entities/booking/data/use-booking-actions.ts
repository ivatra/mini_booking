import { useAsyncAction } from "@shared";

import { useBookingsStore } from "./use-bookings-store";

export const useBookingActions = (bookingId: string) => {
  const { loading, error, execute } = useAsyncAction();
  const { book: _book, cancelBook: _cancelBook } = useBookingsStore();

  const book = () => execute(() => _book(bookingId));
  const cancelBook = () => execute(() => _cancelBook(bookingId));

  return { loading, error, book, cancelBook };
};
