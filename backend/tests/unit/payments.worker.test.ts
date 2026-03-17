import { describe, expect, it } from "vitest";
import { nextRetryAt } from "../../src/modules/payments/payments.worker.js";

describe("payments.worker", () => {
  it("schedules retry in the future", () => {
    const now = new Date("2026-01-01T00:00:00Z");
    const next = nextRetryAt(now, 1);
    expect(next.getTime()).toBeGreaterThan(now.getTime());
  });
});
