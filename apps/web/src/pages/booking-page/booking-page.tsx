import { useParams } from "react-router-dom";

// import s from "./booking-page.module"

const BookingPage = () => {
  const { roomId } = useParams<{ roomId: string }>();

  return <>{roomId}</>;
};

export default BookingPage;
