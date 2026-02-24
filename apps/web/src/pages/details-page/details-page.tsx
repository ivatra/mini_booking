import { RoomCard } from "@entities";
import { Group, Stack, Title } from "@mantine/core";
import { GridList, MOCK_HOTELS, MOCK_ROOMS } from "@shared";
import { useParams } from "react-router";

import BookingDatePicker from "./booking-date-picker";
import s from "./details-page.module.css";

const DetailsPage = () => {
  const { numId } = useParams<{ numId: string }>();
  const hotel = MOCK_HOTELS.find((v) => v.id === numId);
  const rooms = MOCK_ROOMS.filter((v) => v.hotelId === numId);

  if (!hotel || !rooms.length) {
    return (
      <Title
        order={3}
        c="red">
        Не найден отель/ комнаты для этого отеля
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
        <BookingDatePicker />
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
