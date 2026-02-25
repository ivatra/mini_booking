import type { IBooking } from "@entities";
import { Group, Stack, Text, Title } from "@mantine/core";

import s from "./booking-card.module.css";

interface IProps {
  booking: IBooking;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const BookingCard = ({ booking }: IProps) => {
  const isFree = booking.status === "avaliable";
  const statusClassName = isFree ? s.status_free : s.status_busy;

  return (
    <Stack className={s.booking_card}>
      <Group className={s.booking_head}>
        <Title
          order={4}
          className={s.booking_dates}>
          {formatDate(booking.checkIn)} — {formatDate(booking.checkOut)}
        </Title>
        <Text className={`${s.booking_status} ${statusClassName}`}>
          {isFree ? "Свободно" : "Занято"}
        </Text>
      </Group>

      {booking.guestName && (
        <Text className={s.booking_guest}>Гость: {booking.guestName}</Text>
      )}

      <Text className={s.booking_created}>
        Создано: {formatDate(booking.createdAt)}
      </Text>
    </Stack>
  );
};

export default BookingCard;
