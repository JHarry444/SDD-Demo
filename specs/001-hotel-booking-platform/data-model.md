# Data Model: QA Hotel Reservation Platform

## Entity: UserAccount
- Description: Guest identity used for authentication and reservation ownership.
- Fields:
  - id (UUID, primary key)
  - email (string, unique, required)
  - passwordHash (string, required)
  - emailVerifiedAt (datetime, nullable)
  - status (enum: pending_verification, active, suspended, deleted)
  - createdAt (datetime, required)
  - updatedAt (datetime, required)
- Validation rules:
  - email must be RFC-compliant format and unique.
  - passwordHash must never store plaintext or reversible encryption.
- Relationships:
  - 1:N with Session
  - 1:N with Reservation

## Entity: AdminAccount
- Description: Administrator identity with full-access role at launch.
- Fields:
  - id (UUID, primary key)
  - email (string, unique, required)
  - passwordHash (string, required)
  - role (enum: admin_full_access)
  - status (enum: active, suspended)
  - createdAt (datetime, required)
  - updatedAt (datetime, required)
- Validation rules:
  - role must be admin_full_access at launch.
- Relationships:
  - 1:N with AuditEvent

## Entity: Session
- Description: Authenticated session for user or admin access.
- Fields:
  - id (UUID, primary key)
  - principalType (enum: user, admin)
  - principalId (UUID, required)
  - issuedAt (datetime, required)
  - expiresAt (datetime, required)
  - revokedAt (datetime, nullable)
  - ipAddress (string, nullable)
- Validation rules:
  - expiresAt must be greater than issuedAt.
- State transitions:
  - active -> expired (time-based)
  - active -> revoked (manual/security action)

## Entity: Room
- Description: Reservable hotel room definition.
- Fields:
  - id (UUID, primary key)
  - code (string, unique, required)
  - roomType (string, required)
  - nightlyRate (decimal, required)
  - currency (string, required)
  - maxGuests (integer, required)
  - status (enum: active, inactive, maintenance)
  - createdAt (datetime, required)
  - updatedAt (datetime, required)
- Validation rules:
  - nightlyRate must be >= 0.
  - maxGuests must be >= 1.
- Relationships:
  - M:N with Amenity
  - 1:N with Reservation

## Entity: Amenity
- Description: Search/filter attribute assigned to rooms.
- Fields:
  - id (UUID, primary key)
  - name (string, unique, required)
  - category (string, nullable)
- Relationships:
  - M:N with Room

## Entity: Reservation
- Description: Booking lifecycle record tied to user and room.
- Fields:
  - id (UUID, primary key)
  - userId (UUID, foreign key UserAccount.id)
  - roomId (UUID, foreign key Room.id)
  - checkInDate (date, required)
  - checkOutDate (date, required)
  - guestCount (integer, required)
  - status (enum: pending_payment, confirmed, cancelled, failed, expired)
  - holdExpiresAt (datetime, nullable)
  - totalAmount (decimal, required)
  - currency (string, required)
  - createdAt (datetime, required)
  - updatedAt (datetime, required)
- Validation rules:
  - checkOutDate must be later than checkInDate.
  - guestCount must be > 0 and <= room maxGuests.
  - Date-range overlap for active/pending reservations on same room is forbidden.
- Relationships:
  - N:1 with UserAccount
  - N:1 with Room
  - 1:N with PaymentRecord
- State transitions:
  - pending_payment -> confirmed (payment captured)
  - pending_payment -> failed (retry policy exhausted)
  - pending_payment -> expired (hold timeout)
  - confirmed -> cancelled (policy-allowed cancellation)

## Entity: PaymentRecord
- Description: Attempt/result log for reservation payment lifecycle.
- Fields:
  - id (UUID, primary key)
  - reservationId (UUID, foreign key Reservation.id)
  - providerReference (string, nullable)
  - attemptNumber (integer, required)
  - amount (decimal, required)
  - currency (string, required)
  - status (enum: initiated, authorized, captured, failed, refunded)
  - failureReason (string, nullable)
  - attemptedAt (datetime, required)
- Validation rules:
  - attemptNumber increments monotonically per reservation.
  - captured amount must equal reservation total unless partial payments are explicitly enabled (not in scope).
- Relationships:
  - N:1 with Reservation
- State transitions:
  - initiated -> authorized -> captured
  - initiated/authorized -> failed
  - captured -> refunded (future, optional)

## Entity: AuditEvent
- Description: Immutable record of sensitive admin actions.
- Fields:
  - id (UUID, primary key)
  - adminId (UUID, foreign key AdminAccount.id)
  - actionType (string, required)
  - targetType (string, required)
  - targetId (string, nullable)
  - metadataJson (json, nullable)
  - createdAt (datetime, required)
- Validation rules:
  - actionType and targetType cannot be empty.
- Relationships:
  - N:1 with AdminAccount
