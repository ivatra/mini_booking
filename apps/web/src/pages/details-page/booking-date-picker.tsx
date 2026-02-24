import { Stack, Text } from "@mantine/core";
import {
  DatePickerInput,
  type DatesRangeValue,
  type DateValue,
} from "@mantine/dates";

interface IProps {
  value: DatesRangeValue<DateValue>;
  onChange: (v: DatesRangeValue<DateValue>) => void;
}

const BookingDatePicker = ({ value, onChange }: IProps) => (
  <Stack gap="xs">
    <Text>Выберите дату брони</Text>
    <DatePickerInput
      size="md"
      aria-label="Выберите дату брони"
      type="range"
      clearable
      value={value}
      onChange={onChange}
      radius="md"
      valueFormat="DD.MM.YY"
    />
  </Stack>
);

export default BookingDatePicker;
