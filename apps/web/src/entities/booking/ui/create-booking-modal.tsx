import { Modal, Select, Button, Stack, Group, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

import s from "./create-booking-modal.module.css";
import useCreateBookingModal from "./use-create-booking-modal";

interface IProps {
  opened: boolean;
  onClose: () => void;
}

const CreateBookingModal = ({ opened, onClose }: IProps) => {
  const {
    dates,
    error,
    loading,
    hotelId,
    roomId,
    setDates,
    setRoomId,
    onHotelIdChange,
    onSubmit,
    roomOptions,
    hotelOptions,
  } = useCreateBookingModal(onClose);

  return (
    <Modal
      title="Создать бронирование"
      opened={opened}
      radius="md"
      onClose={onClose}
      size="md">
      <Stack gap="lg">
        <Select
          label="Отель"
          placeholder="Выберите отель"
          data={hotelOptions}
          value={hotelId}
          onChange={onHotelIdChange}
          searchable
        />

        <Select
          label="Комната"
          placeholder="Выберите комнату"
          data={roomOptions}
          value={roomId}
          onChange={setRoomId}
          disabled={!hotelId}
          searchable
        />

        <DatePickerInput
          type="range"
          label="Даты проживания"
          placeholder="Выберите даты"
          value={dates}
          onChange={setDates}
        />

        {error && (
          <Text
            size="md"
            c="red"
            className={s.error}>
            {error}
          </Text>
        )}

        <Group grow>
          <Button
            variant="light"
            onClick={onClose}>
            Отменить
          </Button>
          <Button
            onClick={onSubmit}
            loading={loading}
            disabled={!hotelId || !roomId || !dates[0] || !dates[1]}>
            Забронировать
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default CreateBookingModal;
