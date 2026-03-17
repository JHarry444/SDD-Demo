type ReservationRecord = {
  id: string;
  roomId: string;
  userId: string;
  checkInDate: string;
  checkOutDate: string;
  status: "pending_payment" | "confirmed";
  totalAmount: number;
  currency: string;
  holdExpiresAt?: string;
};

const reservations: ReservationRecord[] = [];

export async function createReservation(record: ReservationRecord): Promise<ReservationRecord> {
  reservations.push(record);
  return record;
}

export async function listReservationsByUser(userId: string): Promise<ReservationRecord[]> {
  return reservations.filter((r) => r.userId === userId);
}
