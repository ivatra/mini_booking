import { Button, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

import classes from "./RoomsPageHeader.module.css";

/* m - это сокращенно main, классы по БЭМ
  но я не вижу смысла делать этот блок масштабируемым (тоесть давать конкретное название сущности и 
  более абстрактную логику)
  в моей практике я не люблю привязываться к другим селекторам, поэтому использую классы
*/

const RoomsPageHeader = () => {
  return (
    <Paper className={classes.m}>
      <Group className={classes.mRow}>
        <Stack className={classes.mMeta}>
          <Title order={1} className={classes.mTitle}>
            Отели
          </Title>
          <Text className={classes.mSubtitle}>2 отеля • 10 номеров</Text>
        </Stack>

        <Group className={classes.mActions}>
          <Stack className={classes.mDate}>
            <Text className={classes.mDateLabel}>Выберите дату брони</Text>

            <DatePickerInput
              aria-label="Выберите диапазон дат"
              type="range"
              value={["2026-02-04", "2026-03-01"]}
              clearable
              valueFormat="DD.MM.YY"
              classNames={{ input: classes.mDateInput }}
            />
          </Stack>

          <Button
            className={classes.mAddButton}
            classNames={{ label: classes.mAddButtonLabel }}>
            Добавить бронь
          </Button>
        </Group>
      </Group>
    </Paper>
  );
};

export default RoomsPageHeader;
