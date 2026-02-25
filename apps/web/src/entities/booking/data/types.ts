export type TBookingStatus = "avaliable" | "busy";
export interface IBooking {
  id: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  status: TBookingStatus;
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

  book: (bookingId: string) => Promise<void>;
  cancelBook: (bookingId: string) => Promise<void>;
}

export interface IApi {
  getBookings: (params: IGetBookingsParams) => Promise<IBooking[]>;
  book: (bookingId: string) => Promise<void>;
  cancelBook: (bookingId: string) => Promise<void>;
}

export interface CreateBookingModalStore {
  isOpen: boolean;

  openModal: () => void;
  closeModal: () => void;
}
