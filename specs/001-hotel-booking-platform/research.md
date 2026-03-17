# Research: QA Hotel Reservation Platform

## Decision 1: Frontend stack uses React 18 + TypeScript
- Decision: Build the client with React 18, TypeScript, React Router, and form validation via schema-based validation.
- Rationale: Strong ecosystem for complex stateful flows (auth, room filters, checkout), excellent testing support, and readability through typed components.
- Alternatives considered: Angular (full framework but heavier baseline), Vue (lighter but team context and ecosystem alignment less explicit).

## Decision 2: Backend stack uses Express 4 + TypeScript
- Decision: Build API services with Express 4 and modular route/controller/service layers.
- Rationale: Fast to implement for REST contracts, broad middleware ecosystem for security, and straightforward test integration with Supertest.
- Alternatives considered: NestJS (more structure but additional complexity), Fastify (performance-focused but less ubiquitous project familiarity assumed).

## Decision 3: Data store uses MySQL 8 as system of record
- Decision: Persist users, rooms, reservations, payment records, and admin actions in MySQL 8.
- Rationale: Relational constraints fit reservation integrity, transactional updates support booking correctness, and SQL querying supports reports.
- Alternatives considered: PostgreSQL (equally suitable but user-selected MySQL), NoSQL stores (weaker fit for relational booking constraints).

## Decision 4: ORM and schema management via Prisma
- Decision: Use Prisma for schema modeling, migrations, and typed DB access.
- Rationale: Improves readability, reduces raw-SQL boilerplate, supports migration discipline, and provides test-friendly data access patterns.
- Alternatives considered: Sequelize/TypeORM (more runtime complexity), raw SQL query builder (more manual mapping overhead).

## Decision 5: Reservation-before-payment with async payment retries
- Decision: Create a pending reservation first, place temporary hold, then process payment with asynchronous retries on failure.
- Rationale: Matches clarified business rule, preserves booking intent context, and enables explicit lifecycle states for failure recovery.
- Alternatives considered: Payment-first reservation creation (rejected by clarification), synchronous-only retries (lower completion resilience).

## Decision 6: Security baseline for launch
- Decision: Enforce HTTPS-only transport, strong password hashing, secure sessions, input validation, and common web hardening middleware; no MFA at launch.
- Rationale: Aligns with explicit requirements while keeping login friction lower for initial release.
- Alternatives considered: MFA for admins/all users (deferred by clarification), JWT-only auth without server sessions (less aligned with session-management requirement).

## Decision 7: Testing strategy is layered and mandatory
- Decision: Adopt unit + integration + e2e tests with contract tests for API boundaries and regression tests for bug fixes.
- Rationale: Directly satisfies constitution and lowers regression risk for booking-critical workflows.
- Alternatives considered: E2E-only testing (too slow and brittle), unit-only testing (insufficient confidence at integration boundaries).

## Decision 8: API contracts documented with OpenAPI
- Decision: Define backend REST interface with OpenAPI contract in contracts/openapi.yaml.
- Rationale: Explicit boundary contracts improve frontend/backend alignment and support test-case generation for contract compliance.
- Alternatives considered: Ad-hoc markdown endpoint docs (higher drift risk), code-first only docs (less explicit design artifact for planning phase).

## Decision 9: Initial deployment and runtime model
- Decision: Deploy frontend as static web app and backend API service behind TLS termination, with managed MySQL and background worker for payment retries.
- Rationale: Separates concerns for scalability and reliability while supporting retry workflows required by spec.
- Alternatives considered: Monolithic server-side rendered app (tighter coupling), single-process retry loop (less resilient).
