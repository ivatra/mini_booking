export interface Room {
  id: string;
  hotelId: string;
  title: string;
  capacity: number;
  pricePerNight: number;
  createdAt: string;
}

export interface CreateRoomInput {
  hotelId: string;
  title: string;
  capacity: number;
  pricePerNight: number;
}
