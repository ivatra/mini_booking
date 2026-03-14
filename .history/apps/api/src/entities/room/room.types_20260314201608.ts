export interface Room {
  id: string;
  hotelId: string;
  name: string;
  capacity: number;
  pricePerNight: number;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateRoomInput {
  hotelId: string;
  name: string;
  capacity: number;
  pricePerNight: number;
}
