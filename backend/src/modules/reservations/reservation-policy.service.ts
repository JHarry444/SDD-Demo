export function canModifyReservation(status: string): boolean {
  return status === "confirmed" || status === "pending_payment";
}

export function canCancelReservation(status: string): boolean {
  return status === "confirmed" || status === "pending_payment";
}
