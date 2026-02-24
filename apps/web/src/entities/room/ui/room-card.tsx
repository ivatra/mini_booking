import type { IRoom } from "@entities";
import { Button, Group, Stack, Text, Title } from "@mantine/core";

import s from "./room-card.module.css";

interface IProps {
  room: IRoom;
  hasAvaliableDates: boolean;
}

const RoomCard = ({ room, hasAvaliableDates }: IProps) => {
  const statusClassName = hasAvaliableDates ? s.statusFree : s.statusBusy;

  return (
    <Stack className={s.roomCard}>
      <Group className={s.roomHead}>
        <Group className={s.roomTitleGroup}>
          <Title
            order={3}
            className={s.roomName}>
            Комната {room.name}
          </Title>
          <Text className={s.roomCapacityBadge}>{room.capacity} гостей</Text>
        </Group>

        <Text className={`${s.roomStatus} ${statusClassName}`}>
          {hasAvaliableDates ? "Свободен" : "Занят"}
        </Text>
      </Group>

      <Text className={s.roomPrice}>{room.pricePerNight} руб за ночь</Text>

      <Button
        className={s.bookButton}
        variant="light"
        disabled={!hasAvaliableDates}
        fullWidth>
        Забронировать комнату
      </Button>
    </Stack>
  );
};

export default RoomCard;
