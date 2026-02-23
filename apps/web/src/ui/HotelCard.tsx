import { Badge, Card, Group, Stack, Text, Title } from "@mantine/core";

import { pluralizeRu } from "../helpers";
import type { IHotel } from "../types";
import s from "./HotelCard.module.css";

const HotelCard = ({ id, city, name, rooms, address }: IHotel) => {
  const roomsCount = rooms.length;
  const roomsWord = pluralizeRu(roomsCount, "комната", "комнаты", "комнат");

  return (
    <Card
      key={id}
      className={s.card}
      component="article">
      <Stack gap="xs">
        <Group className={s.headerRow}>
          <Title className={s.title}>{name}</Title>
          <Badge variant="light">
            {rooms.length} {roomsWord}
          </Badge>
        </Group>
        <Text className={s.cityText}>{city}</Text>
        {address ? (
          <Text
            size="sm"
            className={s.address}>
            {address}
          </Text>
        ) : null}
      </Stack>
    </Card>
  );
};

export default HotelCard;
