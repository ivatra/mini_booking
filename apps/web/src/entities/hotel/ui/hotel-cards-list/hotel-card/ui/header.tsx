import { pluralizeRu } from "@shared";
import { Badge, Group, Title } from "@shared/ui-kit";

import s from "../hotel-card.module.css";

interface IProps {
  name: string;
  roomsCount: number;
}

const Header = ({ name, roomsCount }: IProps) => {
  const roomsWord = pluralizeRu(roomsCount, "комната", "комнаты", "комнат");

  return (
    <Group className={s.headerRow}>
      <Title className={s.title}>{name}</Title>
      <Badge variant="light">
        {roomsCount} {roomsWord}
      </Badge>
    </Group>
  );
};

export default Header;
