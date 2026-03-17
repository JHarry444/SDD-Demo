# Tasks: QA Hotel Reservation Platform

**Input**: Design documents from `/specs/001-hotel-booking-platform/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Test tasks are REQUIRED by constitution. Include unit, integration, contract, and e2e coverage for each user story.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize monorepo tooling and baseline web app scaffolding.

- [ ] T001 Initialize workspace scripts and workspaces in package.json
- [ ] T002 Create backend TypeScript project config in backend/tsconfig.json
- [ ] T003 Create frontend Vite React TypeScript config in frontend/vite.config.ts
- [ ] T004 [P] Configure backend lint/format rules in backend/eslint.config.js
- [ ] T005 [P] Configure frontend lint/format rules in frontend/eslint.config.js
- [ ] T006 [P] Add backend env template in backend/.env.example
- [ ] T007 [P] Add frontend env template in frontend/.env.example
- [ ] T008 Add initial CI test workflow in .github/workflows/ci.yml

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build shared architecture required before any user story implementation.

**CRITICAL**: Complete this phase before user story work begins.

- [ ] T009 Create Prisma schema for core entities in backend/prisma/schema.prisma
- [ ] T010 Generate initial migration for core schema in backend/prisma/migrations/001_init/migration.sql
- [ ] T011 Implement database client and config in backend/src/config/db.ts
- [ ] T012 [P] Implement Express app bootstrap and middleware wiring in backend/src/app.ts
- [ ] T013 [P] Implement security middleware (helmet, rate-limit, validation errors) in backend/src/middleware/security.ts
- [ ] T014 [P] Implement session middleware and cookie settings in backend/src/middleware/session.ts
- [ ] T015 Implement shared API error model and handler in backend/src/middleware/error-handler.ts
- [ ] T016 [P] Implement frontend API client and auth-aware fetch wrapper in frontend/src/services/apiClient.ts
- [ ] T017 [P] Configure Playwright project and base e2e setup in e2e/playwright/playwright.config.ts
- [ ] T018 Implement contract test harness bootstrap for OpenAPI in backend/tests/contract/openapi.contract.test.ts

**Checkpoint**: Foundational platform is ready for parallel story implementation.

---

## Phase 3: User Story 1 - Secure Account Access (Priority: P1) MVP

**Goal**: Guests can sign up, verify email, sign in, manage session, and recover password.

**Independent Test**: A new user can complete sign-up to successful authenticated session without room/booking dependencies.

### Tests for User Story 1 (REQUIRED)

- [ ] T019 [P] [US1] Add auth contract tests for signup/login/verify/recovery endpoints in backend/tests/contract/auth.contract.test.ts
- [ ] T020 [P] [US1] Add backend auth service unit tests in backend/tests/unit/auth.service.test.ts
- [ ] T021 [P] [US1] Add backend auth integration tests in backend/tests/integration/auth.routes.test.ts
- [ ] T022 [P] [US1] Add frontend auth component tests in frontend/tests/component/auth/auth-forms.test.tsx
- [ ] T023 [P] [US1] Add e2e auth journey test in e2e/playwright/auth-flow.spec.ts

### Implementation for User Story 1

- [ ] T024 [P] [US1] Implement UserAccount and Session repositories in backend/src/modules/auth/auth.repository.ts
- [ ] T025 [US1] Implement password hashing and credential validation service in backend/src/modules/auth/auth.service.ts
- [ ] T026 [US1] Implement auth routes (signup, verify-email, login, password-recovery) in backend/src/modules/auth/auth.routes.ts
- [ ] T027 [US1] Register auth module routes in backend/src/app.ts
- [ ] T028 [P] [US1] Implement auth screens (signup/login/recovery) in frontend/src/features/auth/pages/AuthPages.tsx
- [ ] T029 [US1] Implement frontend auth state/session handling in frontend/src/features/auth/state/authStore.ts

**Checkpoint**: User Story 1 is independently functional and testable.

---

## Phase 4: User Story 2 - Discover Available Rooms (Priority: P1)

**Goal**: Signed-in users can browse rooms and filter by dates, amenities, and price.

**Independent Test**: A signed-in user can query available rooms with filters and receive accurate matching results.

### Tests for User Story 2 (REQUIRED)

- [ ] T030 [P] [US2] Add room discovery contract tests in backend/tests/contract/rooms.contract.test.ts
- [ ] T031 [P] [US2] Add room availability service unit tests in backend/tests/unit/rooms.service.test.ts
- [ ] T032 [P] [US2] Add room search integration tests in backend/tests/integration/rooms.routes.test.ts
- [ ] T033 [P] [US2] Add room search/filter UI tests in frontend/tests/component/rooms/room-search.test.tsx
- [ ] T034 [P] [US2] Add e2e room discovery journey test in e2e/playwright/room-discovery.spec.ts

### Implementation for User Story 2

- [ ] T035 [P] [US2] Implement Room and Amenity repositories in backend/src/modules/rooms/rooms.repository.ts
- [ ] T036 [US2] Implement availability and filter logic in backend/src/modules/rooms/rooms.service.ts
- [ ] T037 [US2] Implement GET /rooms endpoint in backend/src/modules/rooms/rooms.routes.ts
- [ ] T038 [US2] Register rooms module routes in backend/src/app.ts
- [ ] T039 [P] [US2] Implement room listing and filter UI in frontend/src/features/rooms/pages/RoomSearchPage.tsx
- [ ] T040 [US2] Implement room query state and URL filter sync in frontend/src/features/rooms/state/roomSearchStore.ts

**Checkpoint**: User Stories 1 and 2 work independently.

---

## Phase 5: User Story 3 - Complete Room Booking (Priority: P1)

**Goal**: Users create pending reservations, complete payment flow, and receive confirmation.

**Independent Test**: User selects room, creates pending reservation, and transitions to confirmed reservation after successful payment.

### Tests for User Story 3 (REQUIRED)

- [ ] T041 [P] [US3] Add reservation/payment contract tests in backend/tests/contract/reservations.contract.test.ts
- [ ] T042 [P] [US3] Add reservation lifecycle unit tests in backend/tests/unit/reservations.service.test.ts
- [ ] T043 [P] [US3] Add payment retry worker unit tests in backend/tests/unit/payments.worker.test.ts
- [ ] T044 [P] [US3] Add reservation and payment integration tests in backend/tests/integration/reservations.routes.test.ts
- [ ] T045 [P] [US3] Add frontend checkout component tests in frontend/tests/component/reservations/checkout.test.tsx
- [ ] T046 [P] [US3] Add e2e booking and payment path test in e2e/playwright/booking-flow.spec.ts

### Implementation for User Story 3

- [ ] T047 [P] [US3] Implement Reservation and PaymentRecord repositories in backend/src/modules/reservations/reservations.repository.ts
- [ ] T048 [US3] Implement pending-reservation creation and hold logic in backend/src/modules/reservations/reservations.service.ts
- [ ] T049 [US3] Implement payment processing and async retry worker in backend/src/modules/payments/payments.worker.ts
- [ ] T050 [US3] Implement reservations routes (create/list/detail/confirm-state) in backend/src/modules/reservations/reservations.routes.ts
- [ ] T051 [P] [US3] Implement checkout and confirmation UI in frontend/src/features/reservations/pages/CheckoutPage.tsx
- [ ] T052 [US3] Implement reservation status polling and payment-state UX in frontend/src/features/reservations/state/reservationFlowStore.ts

**Checkpoint**: MVP (US1+US2+US3) is end-to-end functional.

---

## Phase 6: User Story 4 - Manage Existing Reservations (Priority: P2)

**Goal**: Users can view, modify, and cancel reservations according to policy and availability.

**Independent Test**: User with existing reservation can see details, submit valid modification, and cancel reservation with status updates.

### Tests for User Story 4 (REQUIRED)

- [ ] T053 [P] [US4] Add modify/cancel contract tests in backend/tests/contract/reservation-management.contract.test.ts
- [ ] T054 [P] [US4] Add reservation policy unit tests in backend/tests/unit/reservation-policy.service.test.ts
- [ ] T055 [P] [US4] Add reservation management integration tests in backend/tests/integration/reservation-management.routes.test.ts
- [ ] T056 [P] [US4] Add reservation management UI tests in frontend/tests/component/reservations/reservation-management.test.tsx
- [ ] T057 [P] [US4] Add e2e reservation manage flow test in e2e/playwright/reservation-management.spec.ts

### Implementation for User Story 4

- [ ] T058 [US4] Implement reservation modification policy logic in backend/src/modules/reservations/reservation-policy.service.ts
- [ ] T059 [US4] Implement modify and cancel endpoints in backend/src/modules/reservations/reservation-management.routes.ts
- [ ] T060 [P] [US4] Implement reservation history/details UI in frontend/src/features/reservations/pages/ReservationHistoryPage.tsx
- [ ] T061 [US4] Implement modify/cancel actions and optimistic updates in frontend/src/features/reservations/state/reservationManagementStore.ts

**Checkpoint**: User reservation lifecycle is fully self-service.

---

## Phase 7: User Story 5 - Admin Operations and Oversight (Priority: P2)

**Goal**: Admin can manage inventory, oversee bookings/users, and generate occupancy reports.

**Independent Test**: Admin can update room inventory and generate occupancy report with audited actions.

### Tests for User Story 5 (REQUIRED)

- [ ] T062 [P] [US5] Add admin contract tests for inventory/report endpoints in backend/tests/contract/admin.contract.test.ts
- [ ] T063 [P] [US5] Add admin authorization and audit unit tests in backend/tests/unit/admin.service.test.ts
- [ ] T064 [P] [US5] Add admin integration tests in backend/tests/integration/admin.routes.test.ts
- [ ] T065 [P] [US5] Add admin UI component tests in frontend/tests/component/admin/admin-console.test.tsx
- [ ] T066 [P] [US5] Add e2e admin operations test in e2e/playwright/admin-operations.spec.ts

### Implementation for User Story 5

- [ ] T067 [US5] Implement admin auth guard and full-access role enforcement in backend/src/modules/admin/admin-authz.middleware.ts
- [ ] T068 [US5] Implement admin inventory and reporting services in backend/src/modules/admin/admin.service.ts
- [ ] T069 [US5] Implement admin routes (room upsert, occupancy report, booking oversight) in backend/src/modules/admin/admin.routes.ts
- [ ] T070 [P] [US5] Implement admin console UI pages in frontend/src/features/admin/pages/AdminConsolePage.tsx
- [ ] T071 [US5] Implement admin API service adapters in frontend/src/features/admin/services/adminApi.ts

**Checkpoint**: All user stories are independently functional.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: System hardening and cross-story quality improvements.

- [ ] T072 [P] Add API observability logging and request correlation in backend/src/middleware/observability.ts
- [ ] T073 Add retry/expiry background scheduler wiring in backend/src/modules/payments/payments.scheduler.ts
- [ ] T074 [P] Add regression tests for previously fixed defects in backend/tests/integration/regression.booking.test.ts
- [ ] T075 Perform readability refactor pass for core services in backend/src/modules/
- [ ] T076 [P] Update operational and developer docs in docs/qa-hotel-runbook.md
- [ ] T077 Validate quickstart commands and expected outputs in specs/001-hotel-booking-platform/quickstart.md
- [ ] T078 Run full test suite and publish evidence report in specs/001-hotel-booking-platform/test-evidence.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup completion and blocks all user stories.
- **User Stories (Phase 3-7)**: Depend on Foundational completion.
- **Polish (Phase 8)**: Depends on completion of selected user stories.

### User Story Dependencies

- **US1 (P1)**: Starts after Foundational.
- **US2 (P1)**: Starts after Foundational; independent from US1 except shared auth middleware.
- **US3 (P1)**: Starts after US1 and US2 (requires authenticated user and room availability flow).
- **US4 (P2)**: Starts after US3 (requires existing reservations).
- **US5 (P2)**: Starts after Foundational and can run in parallel with US3/US4.

### Within Each User Story

- Tests before implementation.
- Repository/model work before services.
- Services before routes/UI integration.
- Complete and validate story before moving forward.

### Dependency Graph

- Phase1 -> Phase2 -> (US1 || US2 || US5) -> US3 -> US4 -> Phase8

---

## Parallel Execution Examples

### User Story 1

```bash
# Run in parallel:
T019, T020, T021, T022, T023
T024 and T028
```

### User Story 2

```bash
# Run in parallel:
T030, T031, T032, T033, T034
T035 and T039
```

### User Story 3

```bash
# Run in parallel:
T041, T042, T043, T044, T045, T046
T047 and T051
```

### User Story 4

```bash
# Run in parallel:
T053, T054, T055, T056, T057
T060 can run while backend modify/cancel endpoints are being finalized
```

### User Story 5

```bash
# Run in parallel:
T062, T063, T064, T065, T066
T068 and T070
```

---

## Implementation Strategy

### MVP First (US1 + US2 + US3)

1. Complete Setup and Foundational phases.
2. Deliver US1 (secure account access).
3. Deliver US2 (room discovery).
4. Deliver US3 (booking + payment) and validate end-to-end booking journey.
5. Demo/deploy MVP before P2 stories.

### Incremental Delivery

1. Ship MVP baseline.
2. Add US4 reservation management and validate policy behavior.
3. Add US5 admin operations and reporting.
4. Complete cross-cutting polish and run full regression suite.

### Parallel Team Strategy

1. Team A: backend core + contracts.
2. Team B: frontend feature pages + state management.
3. Team C: test automation (contract/integration/e2e) and CI quality gates.

---

## Notes

- All tasks follow the required checklist format with task ID, optional [P], optional [USx], and file path.
- [P] tasks are intended to avoid file conflicts and blocking dependencies.
- Keep commits scoped to one task or one coherent slice.
