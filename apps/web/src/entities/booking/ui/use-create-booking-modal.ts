import { useHotels, useRooms } from "@entities";
import type { DatesRangeValue, DateValue } from "@mantine/dates";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const useCreateBookingModal = (onClose: () => void) => {
  const navigate = useNavigate();

  const { hotels, getHotels } = useHotels();
  const { rooms, getRooms } = useRooms();

  const [hotelId, setHotelId] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);

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
    setError(null);
  };

  const onSubmit = async () => {
    if (!hotelId || !roomId || !dates[0] || !dates[1]) {
      setError("Заполните все поля");

      return;
    }

    try {
      setLoading(true);
      onClose();
      navigate(`/rooms/${roomId}`);
      clearModalData();
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
  };
};

export default useCreateBookingModal;
