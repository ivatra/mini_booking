import { BookingsList, useBookingsStore, useGetRoomStore } from "@entities";
import { Group, Stack, Text, Title } from "@mantine/core";
import { CenterLoader, ErrorMessage, isValidUiRange } from "@shared";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import s from "./booking-page.module.css";
import BookingsNotFoundMessage from "./bookings-not-found-message";

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const checkIn = searchParams.get("in");
  const checkOut = searchParams.get("out");
  const highlightId = searchParams.get("highlight") || undefined;

  const { roomId } = useParams<{ roomId: string }>();

  const { bookings, loading, error, getBookings } = useBookingsStore();
  const {
    room,
    loading: roomLoading,
    error: roomError,
    action: getRoom,
  } = useGetRoomStore();

  const hasValidDate = !isValidUiRange([checkIn, checkOut]);

  useEffect(() => {
    if (!roomId) return;

    getRoom(roomId);

    getBookings({
      roomId,
      date: checkIn && checkOut ? { checkIn, checkOut } : undefined,
    });
  }, [roomId, getRoom, getBookings, checkIn, checkOut, hasValidDate]);

  if (roomLoading || loading) return <CenterLoader />;

  if (roomError) return <ErrorMessage message={roomError} />;

  if (!room) return <ErrorMessage message="Комната не найдена" />;

  if (error) return <ErrorMessage message={error} />;

  return (
    <Stack className={s.page_wrap}>
      <Group gap="xl">
        <Stack gap={4}>
          <Title
            order={2}
            className={s.room_title}>
            Комната {room.name}
          </Title>
          <Group className={s.room_meta}>
            <Text className={s.meta_badge}>{room.capacity} гостей</Text>
            <Text className={s.meta_price}>
              {room.pricePerNight} руб за ночь
            </Text>
          </Group>
        </Stack>
      </Group>
      {!bookings.length ? (
        <BookingsNotFoundMessage hasDate={hasValidDate} />
      ) : (
        <BookingsList
          bookings={bookings}
          highlightCardId={highlightId}
        />
      )}
    </Stack>
  );
};

export default BookingPage;
