export interface IHotel {
  id: string;
  name: string;
  city: string;
  address?: string;
  roomsLength: number;
}

export interface IUseHotelsStore {
  hotels: IHotel[];
  loading: number;
  error: string | null;

  getHotels: () => Promise<void>;
}

export interface IApi {
  getHotels: () => Promise<IHotel[]>;
}
