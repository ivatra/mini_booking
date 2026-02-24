import { Group, Paper, Stack, Text, Title } from "@mantine/core";

import s from "./header.module.css";

interface IProps {
  cOfHotels: number;
  cOfRooms: number;
}

const Header = ({ cOfHotels, cOfRooms }: IProps) => (
  <Paper
    className={s.m}
    component="section">
    <Group className={s.mRow}>
      <Stack className={s.mMeta}>
        <Title
          order={1}
          className={s.mTitle}>
          Отели
        </Title>
        <Text className={s.mSubtitle}>
          {cOfHotels} отеля • {cOfRooms} номеров
        </Text>
      </Stack>
    </Group>
  </Paper>
);

export default Header;
