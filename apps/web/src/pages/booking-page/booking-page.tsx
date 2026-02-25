import { BookingsList, useBookings, useRoom } from "@entities";
import { Group, Stack, Text, Title } from "@mantine/core";
import { CenterLoader, ErrorMessage } from "@shared";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import s from "./booking-page.module.css";
import BookingsNotFoundMessage from "./bookings-not-found-message";

const BookingPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [searchParams] = useSearchParams();
  const { bookings, loading, error, getBookings } = useBookings();
  const { room, loading: roomLoading, error: roomError, getRoom } = useRoom();

  const checkIn = searchParams.get("in");
  const checkOut = searchParams.get("out");

  const hasValidDate = !!(checkIn && checkOut);

  useEffect(() => {
    if (!roomId) return;

    getRoom(roomId);

    getBookings({
      roomId,
      date: hasValidDate ? { checkIn, checkOut } : undefined,
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
        <BookingsList bookings={bookings} />
      )}
    </Stack>
  );
};

export default BookingPage;
