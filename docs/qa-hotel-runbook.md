# QA Hotel Runbook

## Local Startup
1. Install dependencies from repository root.
2. Start backend on port 4000 and frontend on port 3000.
3. Verify /health returns {"ok": true}.

## Core Validation Checklist
1. Auth: signup, email verify, login, recovery endpoint.
2. Rooms: filter by date/price/amenity.
3. Reservations: pending_payment creation and listing.
4. Admin: occupancy report endpoint and room upsert.

## Operational Notes
1. Request IDs are emitted as x-request-id headers.
2. Reservation payment retries are handled by payments scheduler.
3. Audit and security hardening should be expanded before production.
