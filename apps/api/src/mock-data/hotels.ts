import type { Hotel } from "generated/prisma/client";

export const MOCK_HOTELS: Omit<Hotel, "createdAt" | "updatedAt">[] = [
  {
    id: "hotel-1",
    name: "Aurora Hotel",
    city: "Moscow",
    address: "Tverskaya, 10",
  },
  {
    id: "hotel-2",
    name: "Neva Hotel",
    city: "Saint Petersburg",
    address: "Nevsky Prospekt, 25",
  },
];
