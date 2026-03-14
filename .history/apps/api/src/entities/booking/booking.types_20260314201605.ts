export interface Booking {
  id: string;
  roomId: string;
  guestName?: string;
  checkIn: string;
  checkOut: string;
  status: "avaliable" | "busy";
  createdAt: string;
  updatedAt?: string;
}

export interface CreateBookingInput {
  roomId: string;
  guestName?: string;
  checkIn: string | Date;
  checkOut: string | Date;
  status?: "avaliable" | "busy";
}
