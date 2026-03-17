import { describe, expect, it } from "vitest";
import { calculateOccupancyRate } from "../../src/modules/admin/admin.service.js";

describe("admin.service", () => {
  it("calculates occupancy percentage", () => {
    expect(calculateOccupancyRate(50, 100)).toBe(50);
  });
});
