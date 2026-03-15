import type { IRoom } from "@entities";
import { NavigateButton } from "@shared";
import { Group, Stack, Text, Title } from "@shared/ui-kit";

import s from "./room-card.module.css";

interface IProps {
  room: IRoom;
  hasAvaliableBooking: boolean;
  navigateOnClickTo: string;
  isEditMode: boolean;
}

export const RoomCard = ({
  room,
  hasAvaliableBooking,
  navigateOnClickTo,
  isEditMode,
}: IProps) => {
  const statusClassName = hasAvaliableBooking ? s.statusFree : s.statusBusy;

  return (
    <Stack className={s.roomCard}>
      <Group className={s.roomHead}>
        <Group className={s.roomTitleGroup}>
          <Title
            order={4}
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
        text={isEditMode ? "Оформить/отменить бронь" : "Оформить бронь"}
        goTo={navigateOnClickTo}
        disabled={!isEditMode && !hasAvaliableBooking}
      />
    </Stack>
  );
};
