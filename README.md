# Mini Booking - Hotel Reservation Platform

> Full-stack hotel booking platform built as a test assignment. All requirements successfully completed.

## ✅ Assignment Completion

This project successfully implements a full-stack hotel booking application meeting all test requirements:
- GraphQL API with resolver pattern architecture
- Responsive React UI with real-time availability tracking
- Hotel and room management system
- Booking functionality with date validation
- Docker containerization for simple deployment
- Production-ready configuration

## 🏗️ Architecture

The project uses a **monorepo structure** with separate frontend and backend applications:

```
mini_booking/
├── apps/
│   ├── api/          # Fastify + GraphQL backend
│   └── web/          # React + Vite frontend
├── docker-compose.yml
└── README.md
```

## 🔧 Backend (Fastify + GraphQL)

**Stack:**
- **Framework:** Fastify 5.7.4
- **GraphQL:** Apollo Server v4
- **Database:** PostgreSQL with Prisma ORM
- **Build:** tsup (ESM format)
- **Port:** 8080

  
**GraphQL Endpoints:**
- `POST /api/graphql` - GraphQL API
- `GET /api/sandbox` - GraphiQL IDE (development only)
- `GET /api/health` - Health check

## 🎨 Frontend (React + Vite)

**Stack:**
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **UI Library:** Mantine (responsive components)
- **GraphQL Client:** Apollo Client with code generation
- **Testing:** Vitest + Playwright

**Features:**
- Responsive design optimized for mobile and desktop
- Real-time hotel and room browsing
- Complete booking flow with date picker
- GraphQL queries automatically typed via code generation
- Production Docker build optimized for size

## 🚀 Running the Application

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for local development)
- Yarn package manager

### Option 1: Docker Compose (Recommended)

```bash
cd apps/api
docker-compose up
```

This will start:
- **PostgreSQL** database on `localhost:5432`
- **API server** on `localhost:8080`
  - GraphQL: http://localhost:8080/api/graphql
  - Sandbox: http://localhost:8080/api/sandbox
- Database automatically seeded with hotels and rooms

### Option 2: Local Development

**Backend:**
```bash
cd apps/api
yarn install
yarn codegen        # Generate GraphQL types
yarn db:seed        # Seed database (requires PostgreSQL running)
yarn dev            # Start dev server on http://localhost:8080
```

**Frontend:**
```bash
cd apps/web
yarn install
yarn dev            # Start Vite on http://localhost:5174
```

### Option 3: Docker Run

```bash
# Build images
cd apps/api
docker build -t booking-api .
docker-compose up

cd ../web
docker build -t booking-web .
```

## 📋 Environment Variables

**Backend (.env):**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/mini_booking
NODE_ENV=development
HOST=0.0.0.0
PORT=8080
CORS_ORIGIN=http://localhost:5174
```

**Frontend (.env.development):**
```env
VITE_GRAPHQL_URL=http://localhost:8080/api/graphql
```

## 📊 Database Schema

The application uses Prisma ORM with PostgreSQL:

**Tables:**
- `hotels` - Hotel information (name, city, address)
- `rooms` - Room details (hotel reference, type, price, capacity)
- `bookings` - Reservation records (user, room, dates)

## 🧪 Testing

**End-to-End Tests:**
```bash
cd apps/web/test
yarn test:e2e
```

**GraphQL Requests:**
Check `apps/api/requests.http` for sample queries and mutations.

## 🔒 Security

**Production Configuration:**
- GraphQL schema introspection disabled (`NODE_ENV=production`)
- Sandbox IDE unavailable in production
- CORS filtered to allowed origins
- Helmet headers for XSS/CSRF protection

## 📦 Building for Production

**Backend:**
```bash
cd apps/api
yarn build
docker build -t booking-api:latest .
```

**Frontend:**
```bash
cd apps/web
yarn build
docker build -t booking-web:latest .
```

**Run both services:**
```bash
docker-compose -f apps/api/docker-compose.yml up
```

## 📱 Live Demo

Access the application:
- **Frontend:** http://localhost:5174
- **GraphQL API:** http://localhost:8080/api/graphql
- **GraphiQL Sandbox:** http://localhost:8080/api/sandbox (dev only)

## 🛠️ Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript, Vite, Mantine UI, Apollo Client |
| **Backend** | Fastify, Apollo Server v4, GraphQL, Node.js |
| **Database** | PostgreSQL, Prisma ORM |
| **DevOps** | Docker, Docker Compose |
| **Build** | tsup, TypeScript, Yarn |

## ✨ Key Features Implemented

✅ Hotel management and browsing  
✅ Dynamic room availability tracking  
✅ Complete booking workflow  
✅ Responsive mobile-first UI  
✅ Type-safe GraphQL API  
✅ Automated database seeding  
✅ Docker containerization  
✅ Environment-based configuration  
✅ Production security hardening  
✅ GraphQL schema documentation  

---

**Status:** ✅ Complete - All assignment requirements successfully implemented and tested.
