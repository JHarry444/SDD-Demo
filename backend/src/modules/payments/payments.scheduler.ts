import { queuePaymentRetry } from "./payments.worker.js";

let timer: NodeJS.Timeout | null = null;

export function startPaymentScheduler(): void {
  if (timer) return;
  timer = setInterval(() => {
    void queuePaymentRetry("sample-reservation", 1);
  }, 60_000);
}

export function stopPaymentScheduler(): void {
  if (!timer) return;
  clearInterval(timer);
  timer = null;
}
