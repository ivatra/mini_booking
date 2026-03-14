# GraphQL Integration

## Overview

This project uses GraphQL for communication between the frontend and backend. Both the API and web applications have been updated to support full GraphQL functionality.

## Backend (API)

### Architecture

- **Framework**: Fastify
- **GraphQL Server**: Apollo Server
- **Database**: PostgreSQL with Prisma ORM

### Running the API

```bash
cd apps/api

# Development with hot reload
npm run dev

# Build
npm run build

# Production
npm start
```

The GraphQL endpoint is available at: `POST http://localhost:8080/graphql`

The GraphQL playground is automatically available at the endpoint URL.

### Schema

The GraphQL schema is defined in `src/graphql/schema.graphql` with the following main types:

#### Queries

- `hotels`: Get all hotels with their basic information
- `hotel(id)`: Get a specific hotel with rooms
- `rooms(hotelId)`: Get all rooms for a hotel
- `room(id)`: Get a specific room with bookings and hotel details
- `bookings(roomId)`: Get all bookings for a room
- `booking(id)`: Get a specific booking

#### Mutations

- `createBooking(roomId, checkIn, checkOut)`: Create a new booking
- `confirmBooking(bookingId)`: Confirm a booking (mark as busy)
- `cancelBooking(bookingId)`: Cancel a booking (mark as available)

### Services

Services are located in `src/entities/{entity}/` and handle business logic:

- **HotelService**: Hotel management
- **RoomService**: Room management
- **BookingService**: Booking management with conflict detection

## Frontend (Web)

### Apollo Client Setup

Apollo Client is configured in `src/shared/graphql/client.ts` and connects to the backend GraphQL endpoint via the `VITE_API_URL` environment variable.

### GraphQL Operations

GraphQL queries and mutations are defined in `src/shared/graphql/queries.ts`:

- `GET_HOTELS`: Fetch all hotels
- `GET_HOTEL`: Fetch a single hotel with rooms
- `GET_ROOMS`: Fetch rooms for a hotel
- `GET_ROOM`: Fetch room details
- `GET_BOOKINGS_BY_ROOM`: Fetch bookings for a room
- `CREATE_BOOKING`: Create a new booking
- `CANCEL_BOOKING`: Cancel a booking
- `CONFIRM_BOOKING`: Confirm a booking

### State Management

Zustand stores in `src/entities/*/data/` handle state management with the following stores:

- **useHotelsStore**: Hotel data and loading state
- **useRoomsStore**: Room data with availability tracking
- **useBookingsStore**: Booking data with real-time updates

### API Layer

The mock API files in `src/entities/*/data/mock-api.ts` now use Apollo Client to make real GraphQL requests instead of returning mock data:

- `src/entities/hotel/data/mock-api.ts`: Hotel API
- `src/entities/room/data/mock-api.ts`: Room API
- `src/entities/booking/data/mock-api.ts`: Booking API

### Environment Variables

Create a `.env.development` file in the web app directory:

```env
VITE_API_URL=http://localhost:8080/graphql
VITE_POSTHOG_KEY=
VITE_POSTHOG_HOST=
VITE_ENABLE_ANALYTICS=false
```

### Running the Frontend

```bash
cd apps/web

# Development with hot reload
npm run dev

# Build
npm run build

# Preview production build
npm run preview

# Run tests
npm test
```

## Development Workflow

### Making API Changes

1. Update the Prisma schema if database changes are needed
2. Create a migration: `npm run prisma migrate dev -- --name change_description`
3. Update GraphQL schema in `src/graphql/schema.graphql`
4. Update resolvers in `src/graphql/resolvers.ts`
5. Restart the API server

### Making Frontend Changes

1. Update GraphQL queries/mutations if needed in `src/shared/graphql/queries.ts`
2. Update store logic in `src/entities/*/data/use-*-store.ts`
3. Update components to use the stores
4. Changes will hot-reload in development

## Database Seeding

To populate the database with initial data:

```bash
cd apps/api
npm run prisma db seed
```

The seed script is located in `src/seed.ts`.

## Production Deployment

For production, ensure the following environment variables are set:

### API

- `DATABASE_URL`: PostgreSQL connection string
- `CORS_ORIGIN`: Frontend URL
- `NODE_ENV=production`

### Frontend

- `VITE_API_URL`: Backend GraphQL endpoint

## Troubleshooting

### CORS Issues

If you see CORS errors, check the `CORS_ORIGIN` environment variable in the API's `.env` file.

### Database Connection

Ensure PostgreSQL is running and the `DATABASE_URL` is correct.

### Apollo Client Caching

Apollo Client caches results. To clear the cache, restart the development server or clear the in-memory cache programmatically.

## What's Next

- Add GraphQL subscriptions for real-time booking updates (WebSocket)
- Implement proper error handling and validation
- Add authentication and authorization
- Implement pagination for large datasets
- Add caching strategies for better performance
