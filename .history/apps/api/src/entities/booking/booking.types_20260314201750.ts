export interface Booking {
  id: string;
  roomId: string;
  guestName?: string | undefined;
  checkIn: string;
  checkOut: string;
  status: "avaliable" | "busy";
  createdAt: string;
  updatedAt?: string | undefined;
}

export interface CreateBookingInput {
  roomId: string;
  guestName?: string | undefined;
  checkIn: string | Date;
  checkOut: string | Date;
  status?: "avaliable" | "busy";
}
