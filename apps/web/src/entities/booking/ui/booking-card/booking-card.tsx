import { type IBooking } from "@entities";
import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

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
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get("highlight");

  const isNewBooking = booking.id === highlightId;

  const { book, cancelBook, error, loading } = useBookingActions(booking.id);

  const isFree = booking.status === "avaliable";
  const statusClassName = isFree ? s.status_free : s.status_busy;

  const onClick = () => (isFree ? book() : cancelBook());

  return (
    <Stack
      className={`${s.booking_card} ${isNewBooking ? s.cardHighlight : ""}`}>
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
