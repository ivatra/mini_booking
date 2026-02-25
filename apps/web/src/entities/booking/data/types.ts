export interface IBooking {
  id: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  status: "avaliable" | "busy";
  guestName?: string;
  createdAt: string;
}

export interface IGetBookingsParams {
  roomId: string;
  date?: {
    checkIn: string;
    checkOut: string;
  };
}

export interface IBookingsState {
  bookings: IBooking[];
  loading: number;
  error: string | null;

  getBookings: (params: IGetBookingsParams) => Promise<void>;
}

export interface IApi {
  getBookings: (params: IGetBookingsParams) => Promise<IBooking[]>;
}
