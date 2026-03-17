import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("rooms routes", () => {
  it("returns room list", async () => {
    const res = await request(app).get("/rooms").query({
      checkIn: "2026-04-01",
      checkOut: "2026-04-03"
    });
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.items)).toBe(true);
  });
});
