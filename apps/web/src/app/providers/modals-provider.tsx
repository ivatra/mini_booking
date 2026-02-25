import { CreateBookingModal, useCreateBookingModal } from "@entities";

interface IProps {
  children: React.ReactNode;
}

const ModalsProvider = ({ children }: IProps) => {
  const { closeModal, isOpen } = useCreateBookingModal();

  return (
    <>
      <CreateBookingModal
        closeModal={closeModal}
        opened={isOpen}
      />
      {children}
    </>
  );
};

export default ModalsProvider;
