import { Stack, Text, Title } from "@mantine/core";

interface IProps {
  hasDate: boolean;
}
const BookingsNotFoundMessage = ({ hasDate }: IProps) => {
  return (
    <Stack>
      <Title order={3}>По вашему запросу не было найдено номеров</Title>
      <Text>
        {hasDate
          ? "Попробуйте сбросить поисковые параметры"
          : "Перейдите в другой номер"}
      </Text>
    </Stack>
  );
};

export default BookingsNotFoundMessage;
