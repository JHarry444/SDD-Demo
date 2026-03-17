import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("auth routes", () => {
  it("responds on password recovery endpoint", async () => {
    const res = await request(app).post("/auth/password-recovery").send({
      email: "user@example.com"
    });
    expect(res.status).toBe(202);
  });
});
