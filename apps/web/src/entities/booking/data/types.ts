export interface IBooking {
  id: string;
  roomId: string;
  checkIn: string; // включительно
  checkOut: string; // не включительно
  status: "avaliable" | "busy";
  guestName?: string;
  createdAt: string;
}
