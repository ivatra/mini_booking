import { prisma } from "infra/prisma.js";

import type { Hotel } from "./hotel.types.js";

export class HotelService {
  async getAll(): Promise<Hotel[]> {
    const hotels = await prisma.hotel.findMany({});

    return hotels.map((hotel) => ({
      id: hotel.id,
      name: hotel.name,
      city: hotel.city,
      address: hotel.address,
      createdAt: hotel.createdAt.toISOString(),
    }));
  }

  public async getById(id: string): Promise<Hotel | undefined> {
    const hotel = await prisma.hotel.findUnique({ where: { id } });

    if (!hotel) {
      return undefined;
    }

    return {
      id: hotel.id,
      name: hotel.name,
      city: hotel.city,
      address: hotel.address,
      createdAt: hotel.createdAt.toISOString(),
    };
  }
}
