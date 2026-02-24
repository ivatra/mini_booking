import { RoomCard } from "@entities";
import { Group, Stack, Title } from "@mantine/core";
import { GridList } from "@shared";

import BookingDatePicker from "./booking-date-picker";
import s from "./details-page.module.css";
import useDetailsPage from "./useDetailsPage";

const DetailsPage = () => {
  const { date, hotel, rooms, setDate } = useDetailsPage();

  if (!hotel || !rooms.length) {
    return (
      <Title
        order={3}
        c="red">
        Не найден отель / комнаты для этого отеля
      </Title>
    );
  }

  return (
    <Stack className={s.pageWrap}>
      <Group gap="xl">
        <Title
          order={2}
          className={s.hotelTitle}>
          Отель {hotel?.name}
        </Title>
        <BookingDatePicker
          value={date}
          onChange={setDate}
        />
      </Group>

      <GridList>
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            hasAvaliableDates
          />
        ))}
      </GridList>
    </Stack>
  );
};

export default DetailsPage;
