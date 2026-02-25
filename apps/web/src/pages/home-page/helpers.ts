import type { IHotel } from "@entities";

export const calcCountOfRooms = (countOfRooms: Pick<IHotel, "roomsLength">[]) =>
  countOfRooms.reduce((acc, h) => acc + h.roomsLength, 0);
