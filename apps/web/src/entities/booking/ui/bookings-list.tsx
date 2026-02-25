import { GridList } from "@shared";

import type { IBooking } from "../data/types";
import BookingCard from "./booking-card/booking-card";

interface IProps {
  bookings: IBooking[];
}
const BookingsList = ({ bookings }: IProps) => (
  <GridList>
    {bookings.map((booking) => (
      <BookingCard
        key={booking.id}
        booking={booking}
      />
    ))}
  </GridList>
);

export default BookingsList;
