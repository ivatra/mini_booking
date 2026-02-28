import { roomsStore } from "@common/store.js";

import type { Room } from "./room.types.js";

export class RoomService {
  constructor() {}

  getAll(hotelId?: string): Room[] {
    if (!hotelId) {
      return roomsStore;
    }

    return roomsStore.filter((room) => room.hotelId === hotelId);
  }

  public getById(id: string): Room | undefined {
    return roomsStore.find((room) => room.id === id);
  }
}
