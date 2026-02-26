import { Stack, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import type { TUiDatePickerInput } from "@shared";

interface IProps {
  value: TUiDatePickerInput;
  onChange: (v: TUiDatePickerInput) => void;
}

const BookingDatePicker = ({ value, onChange }: IProps) => (
  <Stack gap="xs">
    <Text>Выберите дату брони</Text>
    <DatePickerInput
      allowSingleDateInRange={false}
      size="md"
      placeholder="Ввод"
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
