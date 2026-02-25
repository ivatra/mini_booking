import { Modal, Select, Button, Stack, Group, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

import s from "./create-booking-modal.module.css";
import useCreateBookingModal from "./use-create-booking-modal";
import { STATUS_OPTIONS } from "../data/helpers";
import type { TBookingStatus } from "../data/types";

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
    status,
    setStatus,
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
          minDate={new Date()}
          type="range"
          label="Даты проживания"
          placeholder="Выберите даты"
          value={dates}
          onChange={setDates}
        />
        <Select
          label="Статус"
          placeholder="Выберите статус"
          defaultValue={STATUS_OPTIONS[0].value}
          data={STATUS_OPTIONS}
          value={status}
          onChange={(val) => setStatus(val as TBookingStatus)}
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
