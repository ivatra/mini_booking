import type { TUiDatePickerInput } from "@shared";
import { Stack, Text } from "@shared/ui-kit";
import { DatePickerInput } from "@shared/ui-kit";

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
