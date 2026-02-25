import { BookingCard, useBookings } from "@entities";
import { Group, Stack, Text, Title } from "@mantine/core";
import { CenterLoader, ErrorMessage, GridList, MOCK_ROOMS } from "@shared";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import s from "./booking-page.module.css";

const BookingPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { bookings, loading, error, getBookings } = useBookings();

  const room = MOCK_ROOMS.find((r) => r.id === roomId);

  useEffect(() => {
    if (!roomId) return;
    getBookings({ roomId });
  }, [roomId, getBookings]);

  if (!room) return <ErrorMessage message="Комната не найдена" />;

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

      {loading > 0 && <CenterLoader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <GridList>
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
            />
          ))}
        </GridList>
      )}
    </Stack>
  );
};

export default BookingPage;
