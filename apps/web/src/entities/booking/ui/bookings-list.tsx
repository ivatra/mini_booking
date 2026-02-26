import { GridList } from "@shared";

import type { IBooking } from "../data/types";
import BookingCard from "./booking-card/booking-card";

interface IProps {
  bookings: IBooking[];
  highlightCardId?: string;
}

const BookingsList = ({ bookings, highlightCardId }: IProps) => (
  <GridList>
    {bookings.map((booking) => (
      <BookingCard
        key={booking.id}
        booking={booking}
        highlight={highlightCardId === booking.id}
      />
    ))}
  </GridList>
);

export default BookingsList;
