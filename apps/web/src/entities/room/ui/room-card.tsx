import type { IRoom } from "@entities";
import { Group, Stack, Text, Title } from "@mantine/core";
import { NavigateButton } from "@shared";

import s from "./room-card.module.css";

interface IProps {
  room: IRoom;
  hasAvaliableBooking: boolean;
}

const RoomCard = ({ room, hasAvaliableBooking }: IProps) => {
  const statusClassName = hasAvaliableBooking ? s.statusFree : s.statusBusy;

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
          {hasAvaliableBooking ? "Свободен" : "Занят"}
        </Text>
      </Group>

      <Text className={s.roomPrice}>{room.pricePerNight} руб за ночь</Text>

      <NavigateButton
        text="Забронировать номер"
        goTo={`/rooms/${room.id}`}
      />
    </Stack>
  );
};

export default RoomCard;
