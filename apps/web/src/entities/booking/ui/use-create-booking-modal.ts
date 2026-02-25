import { useBookings, useHotels, useRooms } from "@entities";
import type { DatesRangeValue, DateValue } from "@mantine/dates";
import { convertDateToIso, isValidUiRange } from "@shared";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import type { TBookingStatus } from "../data/types";

const useCreateBookingModal = (onClose: () => void) => {
  const navigate = useNavigate();

  const { hotels, getHotels } = useHotels();
  const { rooms, getRooms } = useRooms();
  const { createBooking } = useBookings();

  const [hotelId, setHotelId] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [status, setStatus] = useState<TBookingStatus>("avaliable");

  const [dates, setDates] = useState<DatesRangeValue<DateValue>>([null, null]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!hotels.length) {
      getHotels();
    }
  }, [getHotels, hotels]);

  const clearModalData = () => {
    setHotelId(null);
    setRoomId(null);
    setDates([null, null]);
    setStatus("avaliable");
    setError(null);
  };

  const onSubmit = async () => {
    if (!hotelId || !roomId || !status || !isValidUiRange(dates)) {
      setError("Заполните все поля");

      return;
    }

    try {
      setLoading(true);
      const convertedDates = convertDateToIso(dates);

      const booking = await createBooking({
        roomId,
        checkIn: convertedDates[0],
        checkOut: convertedDates[1],
        status,
      });

      const params = new URLSearchParams();

      params.set("highlight", booking.id);

      clearModalData();
      onClose();
      navigate(`/rooms/${roomId}?${params.toString()}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка при бронировании");
    } finally {
      setLoading(false);
    }
  };

  const onHotelIdChange = (hotelId: string | null) => {
    setHotelId(hotelId);
    setRoomId(null);

    if (hotelId) getRooms({ hotelId });
  };

  const hotelOptions = useMemo(
    () => hotels.map((h) => ({ value: h.id, label: h.name })),
    [hotels],
  );

  const roomOptions = useMemo(
    () => rooms.map((r) => ({ value: r.id, label: r.name })),
    [rooms],
  );

  return {
    error,
    loading,
    onHotelIdChange,
    onSubmit,
    hotelOptions,
    roomOptions,
    hotelId,
    roomId,
    setRoomId,
    dates,
    setDates,
    status,
    setStatus,
  };
};

export default useCreateBookingModal;
