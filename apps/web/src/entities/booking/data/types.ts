import type { ISubscriptionStore } from "@shared";
import type { StoreApi } from "zustand";

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
export interface ICreateBookingParams {
  roomId: string;
  checkIn: string;
  checkOut: string;
  status: TBookingStatus;
}

type TSubscriptionField = {
  subscription: {
    currentRoomId: string;
    room: StoreApi<ISubscriptionStore>;
  } | null;
};

export interface IUseBookingsStore extends TSubscriptionField {
  bookings: IBooking[];
  loading: number;
  error: string | null;

  getBookings: (params: IGetBookingsParams) => Promise<void>;

  book: (bookingId: string) => Promise<void>;
  cancelBook: (bookingId: string) => Promise<void>;

  createBooking: (params: ICreateBookingParams) => Promise<IBooking>;

  _updateBookingStatus: (bookingId: string, status: TBookingStatus) => void;

  subscribeToRoomBookingStatusChange: (roomId: string) => Promise<void>;
  unSubscribeFromRoomBookingStatusChange: () => void;
  refreshRoomBookingStatusSubscription: () => Promise<void>;
}

export interface IApi {
  getBookings: (params: IGetBookingsParams) => Promise<IBooking[]>;

  book: (bookingId: string) => Promise<void>;

  cancelBook: (bookingId: string) => Promise<void>;

  createBooking: (params: ICreateBookingParams) => Promise<IBooking>;

  subscribeToRoomBookingStatusChange: (
    roomid: string,
    onUpdate: (bookingId: string, status: TBookingStatus) => void,
  ) => Promise<() => void>; // возвращает unsubscribe функцию
}

export interface CreateBookingModalStore {
  isOpen: boolean;

  openModal: () => void;
  closeModal: () => void;
}
