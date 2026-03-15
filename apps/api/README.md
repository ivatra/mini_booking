# mini_booking — API

GraphQL API built with Fastify, Apollo Server, Prisma, and PostgreSQL. Supports queries, mutations, and real-time subscriptions over WebSocket.

## Stack

| Layer         | Technology                                                                                                                  |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| HTTP server   | [Fastify 5](https://fastify.dev)                                                                                            |
| GraphQL       | [Apollo Server 3](https://www.apollographql.com/docs/apollo-server) + [graphql-ws](https://github.com/enisdenjo/graphql-ws) |
| ORM           | [Prisma 7](https://www.prisma.io)                                                                                           |
| Database      | PostgreSQL                                                                                                                  |
| Language      | TypeScript 5 (strict)                                                                                                       |
| Types codegen | [@graphql-codegen/typescript-resolvers](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-resolvers)      |

## Project Structure

```
src/
├── graphql/
│   ├── schema.graphql      # GraphQL schema
│   ├── resolvers.ts        # Composes entity resolvers into one object
│   ├── generated.ts        # Codegen output — typed Resolvers<Context>
│   └── server.ts           # Apollo Server + WebSocket setup
├── entities/
│   ├── hotel/
│   │   ├── hotel.resolvers.ts
│   │   ├── hotel.service.ts
│   │   └── hotel.types.ts
│   ├── room/
│   │   ├── room.resolvers.ts
│   │   ├── room.service.ts
│   │   └── room.types.ts
│   └── booking/
│       ├── booking.resolvers.ts  # Includes pub/sub for subscriptions
│       ├── booking.service.ts
│       └── booking.types.ts
├── common/
│   ├── env.ts              # Environment config via @fastify/env
│   ├── http-error.ts
│   └── plugins/
│       └── security.ts     # Helmet, CORS, rate limiting
├── infra/
│   └── prisma.ts           # Singleton Prisma client
└── index.ts                # Fastify app entry point
```

## Getting Started

### 1. Prerequisites

- Node.js 22+
- Docker (for PostgreSQL)

### 2. Start the database

```bash
docker compose -f docker-compose.postgres.yml up -d
```

### 3. Configure environment

Create a `.env` file in `apps/api/`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mini_booking
HOST=0.0.0.0
PORT=5003
NODE_ENV=development
CORS_ORIGIN=*
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=60000
```

### 4. Install dependencies

```bash
npm install
```

### 5. Run migrations and seed

```bash
npx prisma migrate deploy
npx tsx src/seed.ts
```

### 6. Start development server

```bash
npm run dev
```

The GraphQL endpoint is available at `http://localhost:5003/graphql`.

## Scripts

| Script             | Description                                   |
| ------------------ | --------------------------------------------- |
| `npm run dev`      | Start with hot reload (`tsx watch`)           |
| `npm run build`    | Compile TypeScript to `dist/`                 |
| `npm start`        | Run compiled output                           |
| `npm run codegen`  | Generate resolver types from `schema.graphql` |
| `npm run check`    | TypeScript type-check without emitting        |
| `npm run lint`     | Run ESLint                                    |
| `npm run lint:fix` | Run ESLint with auto-fix                      |
| `npm run format`   | Format with Prettier                          |

## GraphQL Schema

### Types

```graphql
type Hotel { id, name, city, address, createdAt, rooms }
type Room  { id, hotelId, name, capacity, pricePerNight, hotel, bookings,
             isAvailable(checkIn: String, checkOut: String): Boolean! }
type Booking { id, roomId, checkIn, checkOut, status, createdAt, updatedAt, room }
enum BookingStatus { avaliable | busy }
```

### Queries

| Query      | Arguments      | Returns       |
| ---------- | -------------- | ------------- |
| `hotels`   | —              | `[Hotel!]!`   |
| `hotel`    | `id: ID!`      | `Hotel`       |
| `rooms`    | `hotelId: ID!` | `[Room!]!`    |
| `room`     | `id: ID!`      | `Room`        |
| `bookings` | `roomId: ID!`  | `[Booking!]!` |
| `booking`  | `id: ID!`      | `Booking`     |

### Mutations

| Mutation         | Arguments                   | Returns    |
| ---------------- | --------------------------- | ---------- |
| `createBooking`  | `roomId, checkIn, checkOut` | `Booking!` |
| `cancelBooking`  | `bookingId: ID!`            | `Boolean!` |
| `confirmBooking` | `bookingId: ID!`            | `Boolean!` |

### Subscriptions

| Subscription           | Arguments     | Emits on                                           |
| ---------------------- | ------------- | -------------------------------------------------- |
| `bookingStatusChanged` | `roomId: ID!` | `createBooking`, `cancelBooking`, `confirmBooking` |

Subscriptions are served over WebSocket (`ws://localhost:5003/graphql`) using the `graphql-ws` protocol.

### `isAvailable` field

`Room.isAvailable` accepts optional `checkIn` / `checkOut` date strings (ISO 8601). When provided, returns `true` only if there is an `avaliable` booking whose range covers the requested period:

```
booking.checkIn ≤ checkIn  AND  booking.checkOut ≥ checkOut
```

When omitted, returns `true` if the room has any booking with `status = avaliable`.

## Type Codegen

Resolver types are generated from the schema with [`@graphql-codegen/typescript-resolvers`](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-resolvers).

```bash
npm run codegen        # regenerates src/graphql/generated.ts
```

Entity mapper types (`Hotel`, `Room`, `Booking`) are taken from the entity `*.types.ts` files so resolver parents are typed against the real domain objects, not the generated GraphQL schema types. Generated GQL types use a `Gql` prefix (`GqlHotel`, `GqlRoom`, etc.) to avoid naming collisions.

## Path Aliases

| Alias         | Resolves to      |
| ------------- | ---------------- |
| `@common/*`   | `src/common/*`   |
| `@entities/*` | `src/entities/*` |
| `@graphql/*`  | `src/graphql/*`  |
