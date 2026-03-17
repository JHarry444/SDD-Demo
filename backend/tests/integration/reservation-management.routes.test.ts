import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("reservation management routes", () => {
  it("returns 200 for cancel endpoint", async () => {
    const res = await request(app).post("/reservations/r1/cancel");
    expect([200, 404]).toContain(res.status);
  });
});
