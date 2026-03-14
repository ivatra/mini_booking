import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "./generated/prisma/client";
import { MOCK_BOOKING } from "./mock-data/booking";
import { MOCK_HOTELS } from "./mock-data/hotels";
import { MOCK_ROOMS } from "./mock-data/rooms";

const connectionString = process.env["DATABASE_URL"];

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Создаём отели
  await prisma.hotel.createMany({
    data: MOCK_HOTELS,
  });

  // Создаём комнаты
  await prisma.room.createMany({
    data: MOCK_ROOMS,
  });

  // Создаём бронирования
  await prisma.booking.createMany({
    data: MOCK_BOOKING,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
