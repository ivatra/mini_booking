import { Group, Text } from "@mantine/core";

import { isRoomAvailableOnDate } from "../helpers";
import type { HotelRoom } from "../types";
import s from "./HotelCard.module.css";

const HotelCardRoomPreview = (room: HotelRoom) => {
  const isAvailable = isRoomAvailableOnDate(room);

  return (
    <Group className={s.roomItem}>
      <Group
        gap={8}
        className={s.roomMeta}>
        <span
          className={`${s.statusDot} ${isAvailable ? s.statusFree : s.statusBusy}`}
          aria-hidden="true"
        />
        <Text className={s.roomName}>Комната {room.name}</Text>
      </Group>

      <Text className={s.roomPrice}>{room.pricePerNight} руб</Text>
    </Group>
  );
};

export default HotelCardRoomPreview;
