import { type IBooking } from "@entities";
import { Button, Group, Stack, Text, Title } from "@mantine/core";

import s from "./booking-card.module.css";
import { useBookingActions } from "../../data/use-booking-actions";

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
  const { book, cancelBook, error, loading } = useBookingActions(booking.id);
  const isFree = booking.status === "avaliable";
  const statusClassName = isFree ? s.status_free : s.status_busy;

  const onClick = () => (isFree ? book() : cancelBook());

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
      {error && <Text c="red"> Произошла ошибка при обработке заявки</Text>}
      <Button
        variant="light"
        fullWidth
        loading={!!loading}
        onClick={onClick}
        color={!isFree ? "red" : ""}>
        {isFree ? "Забронировать" : "Отменить"}
      </Button>
    </Stack>
  );
};

export default BookingCard;
