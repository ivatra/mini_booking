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
  getRoomById: (id: string) => Promise<IRoom | null>;
}

export interface IApi {
  getRooms: (params: IGetRoomsParams) => Promise<IRoom[]>;
  getRoomById: (id: string) => Promise<IRoom | null>;
}

export interface IRoomState {
  room: IRoom | null;
  loading: number;
  error: string | null;

  getRoom: (id: string) => Promise<void>;
}
