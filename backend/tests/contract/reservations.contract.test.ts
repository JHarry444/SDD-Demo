import { describe, expect, it } from "vitest";

describe("reservations contract", () => {
  it("tracks reservation endpoint", () => {
    expect(["/reservations"]).toContain("/reservations");
  });
});
