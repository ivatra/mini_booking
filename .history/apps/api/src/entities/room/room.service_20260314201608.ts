import { prisma } from "infra/prisma.js";

import type { Room } from "./room.types.js";

export class RoomService {
  constructor() {}

  async getAll(hotelId: string): Promise<Room[]> {
    const rooms = await prisma.room.findMany({
      where: { hotelId },
    });

    return rooms.map((room) => ({
      id: room.id,
      hotelId: room.hotelId,
      name: room.name,
      capacity: room.capacity,
      pricePerNight: room.pricePerNight,
      createdAt: room.createdAt.toISOString(),
      updatedAt: room.updatedAt.toISOString(),
    }));
  }

  async getByHotelId(hotelId: string): Promise<Room[]> {
    return this.getAll(hotelId);
  }

  public async getById(id: string): Promise<Room | undefined> {
    const room = await prisma.room.findUnique({ where: { id } });

    if (!room) {
      return undefined;
    }

    return {
      id: room.id,
      hotelId: room.hotelId,
      name: room.name,
      capacity: room.capacity,
      pricePerNight: room.pricePerNight,
      createdAt: room.createdAt.toISOString(),
      updatedAt: room.updatedAt.toISOString(),
    };
  }
}
