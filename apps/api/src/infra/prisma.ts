import { PrismaPg } from "@prisma/adapter-pg";

import { getEnvVar } from "@common/helpers";

import { PrismaClient } from "../generated/prisma/client";

const connectionString = getEnvVar("DATABASE_URL");

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
