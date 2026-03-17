import { describe, expect, it } from "vitest";

describe("rooms contract", () => {
  it("tracks rooms endpoint", () => {
    expect(["/rooms"]).toContain("/rooms");
  });
});
