// src/entities/booking/hooks/useBookingActions.ts
import { useState, useCallback } from "react";

import { useBookings } from "../data/store";

export const useBookingActions = (bookingId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { book: _book, cancelBook: _cancelBook } = useBookings();

  const executeAction = useCallback(async (action: () => Promise<void>) => {
    setLoading(true);
    setError(null);
    try {
      await action();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка операции");
    } finally {
      setLoading(false);
    }
  }, []);

  const book = useCallback(
    () => executeAction(() => _book(bookingId)),
    [bookingId, _book, executeAction],
  );

  const cancelBook = useCallback(
    () => executeAction(() => _cancelBook(bookingId)),
    [bookingId, _cancelBook, executeAction],
  );

  return {
    loading,
    error,
    book,
    cancelBook,
  };
};
