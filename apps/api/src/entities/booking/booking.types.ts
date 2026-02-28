export interface Booking {
  id: string;
  roomId: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  createdAt: string;
}

export interface CreateBookingInput {
  roomId: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
}
