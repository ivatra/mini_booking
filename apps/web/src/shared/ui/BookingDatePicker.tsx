import { Stack, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
// .m__date {
//   display: flex;
//   flex-direction: column;
//   gap: 4px;
// }

// .m__date-label {
//   font-size: var(--mantine-font-size-sm);
//   font-weight: 600;
//   line-height: 1.2;
// }
const BookingDatePicker = () => (
  <Stack>
    <Text>Выберите дату брони</Text>
    <DatePickerInput
      size="md"
      aria-label="Выберите диапазон дат"
      type="range"
      value={["2026-02-04", "2026-03-01"]}
      clearable
      radius="md"
      valueFormat="DD.MM.YY"
    />
  </Stack>
);

export default BookingDatePicker;
