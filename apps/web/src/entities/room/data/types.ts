export interface IRoom {
  id: string;
  hotelId: string;
  name: string; // "101", "Deluxe 202"
  capacity: number;
  pricePerNight: number;
  hasAvaliableBooking: boolean;
}

export interface IGetRoomsParams {
  hotelId: string;
  range?: { checkIn: string; checkOut: string };
}

export interface IRoomsState {
  rooms: IRoom[];
  loading: number;
  error: string | null;

  getRooms: (params: IGetRoomsParams) => Promise<void>;
}

export interface IApi {
  getRooms: (params: IGetRoomsParams) => Promise<IRoom[]>;
}
