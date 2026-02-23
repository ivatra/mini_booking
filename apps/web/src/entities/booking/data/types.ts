export interface IBooking {
  id: string;
  roomId: string;
  checkIn: Date; // включительно
  checkOut: Date; // не включительно
  status: "avaliable" | "busy";
  guestName?: string;
  createdAt: string;
}
