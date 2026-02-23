import { Group, Paper, Stack, Text, Title } from "@mantine/core";

import s from "./header.module.css";

const Header = () => {
  return (
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
          <Text className={s.mSubtitle}>2 отеля • 10 номеров</Text>
        </Stack>
      </Group>
    </Paper>
  );
};

export default Header;
