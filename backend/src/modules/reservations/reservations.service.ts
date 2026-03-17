import { randomUUID } from "node:crypto";
import { createReservation, listReservationsByUser } from "./reservations.repository.js";

export function calculateHoldExpiry(from: Date): Date {
  return new Date(from.getTime() + 15 * 60 * 1000);
}

export async function createPendingReservation(input: {
  roomId: string;
  userId: string;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
}) {
  const now = new Date();
  const holdExpiresAt = calculateHoldExpiry(now);
  return createReservation({
    id: randomUUID(),
    roomId: input.roomId,
    userId: input.userId,
    checkInDate: input.checkInDate,
    checkOutDate: input.checkOutDate,
    status: "pending_payment",
    totalAmount: 250,
    currency: "USD",
    holdExpiresAt: holdExpiresAt.toISOString()
  });
}

export async function getUserReservations(userId: string) {
  return listReservationsByUser(userId);
}
