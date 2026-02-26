# Frontend (apps/web)

Production-style booking frontend built with `Vite + React + TypeScript + Mantine + Zustand`.

## Product Scope

The app implements a complete booking flow across 3 levels:

1. Home page: list of hotels.
2. Details page: selected hotel, room list, date filtering.
3. Booking page: room bookings, create booking, booking/cancel actions, live status updates.

Navigation:

- `/` - hotels
- `/hotels/:hotelId` - rooms of a selected hotel
- `/rooms/:roomId` - bookings for selected room

## Architecture

The codebase follows a layered modular structure:

- `src/app` - app shell, providers, router, global layout
- `src/pages` - route-level composition and page logic
- `src/entities` - domain modules (`hotel`, `room`, `booking`)
- `src/shared` - cross-cutting utils, UI primitives, analytics, generic hooks

Main idea: business state and side effects live in entity stores; pages compose entity features; shared contains reusable infra.

## Main Patterns Used

### 1) Store-first domain logica

Each business entity has a dedicated store with:

- state (`data`, `loading`, `error`)
- async actions (`get*`, `create*`, `book`, `cancel`)
- local state updates after API calls

This keeps UI components thin and predictable.

### 2) Data access abstraction via module-local API

Entity stores use local `mock-api.ts` files through typed interfaces.
This makes replacement with real backend straightforward: update API implementation, keep store contract stable.

### 3) Real-time style subscription simulation

`booking` entity supports room status subscription:

- `subscribeToRoomBookingStatusChange(roomId)`
- `unSubscribeFromRoomBookingStatusChange(roomId)`
- `unSubscribeFromAllRoomsBookingStatusChange()`

Subscriptions are stored in a `Map<roomId, unsubscribe>`, so lifecycle is explicit and cleanup-safe.

### 4) Import boundary rules (architecture guardrails)

`eslint` uses `no-restricted-imports` to enforce layer boundaries and prevent deep cross-layer coupling.
Test files get a dedicated override config so tests can import internal modules when needed.

### 6) Typed analytics facade

`shared/analytics.ts` wraps PostHog with typed event payloads:

- `booking_button_clicked`
- `booking_action_succeeded`
- `booking_action_failed`

Analytics initialization is controlled by env flags in `main.tsx`.

## Functional Highlights

- Hotel catalog rendering.
- Room availability browsing by hotel.
- Booking date range filtering.
- Create booking modal with validation.
- Booking and cancellation actions.
- Highlight specific booking card from URL query.
- Simulated live booking status updates by room subscription.
- Analytics tracking for booking interactions.

## Tech Stack

- React 19
- TypeScript 5.9
- Vite 7
- Mantine 8
- Zustand 5
- Vitest + Testing Library
- Playwright
- ESLint 9 + Prettier

## Requirements

- Node.js 22+
- Yarn 1.22+

## Quick Start

```bash
cd apps/web
yarn install
yarn dev
```

Default local URL: `http://localhost:5173`.

## Scripts

```bash
yarn dev
yarn build
yarn preview

yarn lint
yarn lint:fix
yarn format

yarn test
yarn test --run
yarn test:unit
yarn test:integration
yarn test:api
yarn test:coverage

yarn test:e2e
yarn test:e2e:ui
yarn test:e2e:headed
```

## Testing Strategy

Test layers are separated under `test/`:

- `test/unit` - isolated units (helpers, small UI behavior)
- `test/integration` - store + API/mock interaction
- `test/api` - mock API contracts
- `test/e2e` - browser-level smoke/regression checks

Config files:

- `test/vite-config.ts` - Vitest setup, include patterns, coverage config
- `test/setup.ts` - DOM matchers and browser API mocks
- `test/playwright.config.ts` - e2e runtime setup, reporters, webServer

## Coverage

Coverage output is configured to:

- `test/results/coverage`

Reporters: text, summary, html.

## CI

Workflow: `.github/workflows/web-ci.yml`

Pipeline:

1. `lint`
2. `test --run`
3. `build`
4. `test:e2e`
5. upload e2e artifacts (`e2e-report`, `e2e-results`)

Triggers:

- push to `master`
- pull request with changes in `apps/web/**`
- manual run (`workflow_dispatch`)

## Environment Variables

Use `.env` for local values and `.env.example` as template.

Main variables:

- `VITE_ENABLE_ANALYTICS`
- `VITE_POSTHOG_HOST`
- `VITE_POSTHOG_KEY`
