export function nextRetryAt(base: Date, attempt: number): Date {
  const backoffMs = Math.min(60, attempt * 10) * 1000;
  return new Date(base.getTime() + backoffMs);
}

export async function queuePaymentRetry(reservationId: string, attempt: number): Promise<void> {
  const when = nextRetryAt(new Date(), attempt);
  console.log(`Queued payment retry for ${reservationId} at ${when.toISOString()}`);
}
