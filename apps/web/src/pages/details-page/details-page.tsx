import { RoomCard } from "@entities";
import { Group, Stack, Title } from "@mantine/core";
import { CenterLoader, ErrorMessage, GridList } from "@shared";

import BookingDatePicker from "./booking-date-picker";
import s from "./details-page.module.css";
import { buildRoomLink } from "./helpers";
import useDetailsPage from "./use-details-page";

const DetailsPage = () => {
  const { date, hotel, rooms, loading, error, setDate } = useDetailsPage();

  if (loading) return <CenterLoader />;

  if (error) return <ErrorMessage message={error} />;

  if (!hotel || !rooms.length)
    return (
      <ErrorMessage message=" Не найден отель / комнаты для этого отеля" />
    );

  const isEditMode = !(date[0] && date[1]);

  return (
    <Stack className={s.pageWrap}>
      <Group gap="xl">
        <Title
          order={2}
          className={s.hotelTitle}>
          Отель {hotel.name}
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
            hasAvaliableBooking={room.hasAvaliableBooking}
            navigateOnClickTo={buildRoomLink(room.id, date)}
            isEditMode={isEditMode}
          />
        ))}
      </GridList>
    </Stack>
  );
};

export default DetailsPage;
