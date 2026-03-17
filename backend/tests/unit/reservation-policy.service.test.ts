import { describe, expect, it } from "vitest";
import { canModifyReservation } from "../../src/modules/reservations/reservation-policy.service.js";

describe("reservation policy", () => {
  it("allows modification when reservation is confirmed", () => {
    expect(canModifyReservation("confirmed")).toBe(true);
  });
});
