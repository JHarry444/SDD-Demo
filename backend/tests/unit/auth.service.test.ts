import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "../../src/modules/auth/auth.service.js";

describe("auth.service", () => {
  it("hashes and verifies a password", async () => {
    const hash = await hashPassword("StrongPassword123!");
    await expect(verifyPassword("StrongPassword123!", hash)).resolves.toBe(true);
  });
});
