export interface Room {
  id: string;
  hotelId: string;
  name: string;
  capacity: number;
  pricePerNight: number;
  createdAt: string;
  updatedAt?: string | undefined;
}

export interface CreateRoomInput {
  hotelId: string;
  name: string;
  capacity: number;
  pricePerNight: number;
}
