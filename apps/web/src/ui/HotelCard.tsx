import { Badge, Card, Group, Stack, Text, Title } from "@mantine/core";

import { pickPreviewRooms, pluralizeRu } from "../helpers";
import type { IHotel } from "../types";
import s from "./HotelCard.module.css";
import HotelCardRoomPreview from "./HotelCardRoomPreview";

const HotelCard = ({ id, city, name, rooms, address }: IHotel) => {
  const roomsCount = rooms.length;
  const roomsWord = pluralizeRu(roomsCount, "комната", "комнаты", "комнат");
  const previewRooms = pickPreviewRooms(rooms, 3);

  return (
    <Card
      key={id}
      className={s.card}
      component="article">
      <Stack gap="sm">
        <Group className={s.headerRow}>
          <Title className={s.title}>{name}</Title>
          <Badge variant="light">
            {roomsCount} {roomsWord}
          </Badge>
        </Group>
        <Group gap="0.4rem">
          <Text className={s.cityText}>{city},</Text>
          {address ? (
            <Text
              size="sm"
              className={s.address}>
              {address}
            </Text>
          ) : null}
        </Group>

        <Stack
          gap={8}
          className={s.roomsList}>
          {previewRooms.map((room) => (
            <HotelCardRoomPreview {...room} />
          ))}
        </Stack>
      </Stack>
    </Card>
  );
};

export default HotelCard;
