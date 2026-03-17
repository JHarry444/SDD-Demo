import { describe, expect, it } from "vitest";

describe("admin contract", () => {
  it("tracks admin endpoints", () => {
    const endpoints = ["/admin/rooms", "/admin/reports/occupancy"];
    expect(endpoints.length).toBe(2);
  });
});
