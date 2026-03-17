import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("admin routes", () => {
  it("returns occupancy report response", async () => {
    const res = await request(app).get("/admin/reports/occupancy").query({
      startDate: "2026-04-01",
      endDate: "2026-04-30"
    });
    expect(res.status).toBe(200);
  });
});
