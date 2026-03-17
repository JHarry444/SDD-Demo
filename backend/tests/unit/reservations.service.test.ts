import { describe, expect, it } from "vitest";
import { calculateHoldExpiry } from "../../src/modules/reservations/reservations.service.js";

describe("reservations.service", () => {
  it("computes future hold expiry", () => {
    const expiry = calculateHoldExpiry(new Date("2026-01-01T00:00:00Z"));
    expect(expiry.getTime()).toBeGreaterThan(new Date("2026-01-01T00:00:00Z").getTime());
  });
});
