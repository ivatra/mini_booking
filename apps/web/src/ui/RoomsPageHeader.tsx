import { Group, Paper, Stack, Text, Title } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

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

        <Stack className={classes.mDate}>
          <Text className={classes.mDateLabel}>Выберите дату брони</Text>
          <DatePickerInput
            size="md"
            aria-label="Выберите диапазон дат"
            type="range"
            value={["2026-02-04", "2026-03-01"]}
            clearable
            valueFormat="DD.MM.YY"
            classNames={{ input: classes.mDateInput }}
          />
        </Stack>
      </Group>
    </Paper>
  );
};

export default RoomsPageHeader;
