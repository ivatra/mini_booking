import { CreateBookingModal, useManageBookingModalStore } from "@entities";

interface IProps {
  children: React.ReactNode;
}

const ModalsProvider = ({ children }: IProps) => {
  const { closeModal, isOpen } = useManageBookingModalStore();

  return (
    <>
      <CreateBookingModal
        onClose={closeModal}
        opened={isOpen}
      />
      {children}
    </>
  );
};

export default ModalsProvider;
