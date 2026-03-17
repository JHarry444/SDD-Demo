# Quickstart: QA Hotel Reservation Platform

## Prerequisites
- Node.js 20 LTS
- npm 10+
- MySQL 8.0
- Playwright browser dependencies

## 1) Configure environment

Create environment files:

- backend/.env
- frontend/.env

Minimum backend variables:

- DATABASE_URL=mysql://user:password@localhost:3306/qahotel
- PORT=4000
- SESSION_SECRET=replace-with-secure-random-secret
- APP_BASE_URL=http://localhost:3000
- API_BASE_URL=http://localhost:4000

Minimum frontend variables:

- VITE_API_BASE_URL=http://localhost:4000

## 2) Install dependencies

From repository root:

```bash
npm install
npm --prefix backend install
npm --prefix frontend install
```

## 3) Initialize database

```bash
npm --prefix backend run prisma:generate
npm --prefix backend run prisma:migrate
npm --prefix backend run seed
```

## 4) Run the application

Run backend:

```bash
npm --prefix backend run dev
```

Run frontend in a separate terminal:

```bash
npm --prefix frontend run dev
```

Open the app at http://localhost:3000

## 5) Run tests

Backend unit + integration:

```bash
npm --prefix backend test
```

Frontend unit/component:

```bash
npm --prefix frontend test
```

Contract tests:

```bash
npm --prefix backend run test:contract
```

End-to-end tests:

```bash
npm --prefix e2e run test
```

## 6) Validate key user journeys

- Guest signup, email verification, login, and password recovery
- Room search with date, amenity, and price filters
- Reservation creation in pending-payment state
- Payment success -> reservation confirmed
- Payment failure -> async retries and visible payment status
- Reservation modify and cancel flows
- Admin inventory update and occupancy report generation

## 7) Security and reliability checks

- Confirm HTTPS-only behavior in non-local environments
- Confirm password hashing and secure session cookie settings
- Validate 5,000 concurrent-session readiness via load test suite
- Validate uptime/error monitoring and alert hooks are configured
