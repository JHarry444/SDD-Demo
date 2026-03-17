import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("booking regression", () => {
  it("keeps reservation creation status stable", async () => {
    const res = await request(app).post("/reservations").send({
      roomId: "r1",
      checkInDate: "2026-05-01",
      checkOutDate: "2026-05-03",
      guestCount: 2
    });
    expect(res.status).toBe(201);
    expect(res.body.status).toBe("pending_payment");
  });
});
