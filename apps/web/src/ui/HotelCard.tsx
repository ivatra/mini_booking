import { Badge, Button, Card, Group, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";

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

        <Button
          className={s.openRoomsButton}
          variant="light"
          fullWidth
          component={Link}
          to={`/${id}`}>
          Перейти к номерам
        </Button>
      </Stack>
    </Card>
  );
};

export default HotelCard;
