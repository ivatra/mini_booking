import { Group, Paper, Stack, Text, Title } from "@mantine/core";

import classes from "./RoomsPageHeader.module.css";

const RoomsPageHeader = () => {
  return (
    <Paper
      className={classes.m}
      component="section">
      <Group className={classes.mRow}>
        <Stack className={classes.mMeta}>
          <Title
            order={1}
            className={classes.mTitle}>
            Отели
          </Title>
          <Text className={classes.mSubtitle}>2 отеля • 10 номеров</Text>
        </Stack>
      </Group>
    </Paper>
  );
};

export default RoomsPageHeader;
