import { Modal } from "@mantine/core";

interface IProps {
  opened: boolean;
  closeModal: () => void;
}

const CreateBookingModal = ({ closeModal, opened }: IProps) => {
  return (
    <Modal
      opened={opened}
      onClose={closeModal}>
      Modal
    </Modal>
  );
};

export default CreateBookingModal;
