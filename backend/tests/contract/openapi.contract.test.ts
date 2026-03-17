import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("openapi contract", () => {
  it("should exist and declare OpenAPI 3.x", () => {
    const openapiPath = path.resolve(process.cwd(), "..", "specs", "001-hotel-booking-platform", "contracts", "openapi.yaml");
    const content = fs.readFileSync(openapiPath, "utf8");
    expect(content.startsWith("openapi: 3.")).toBe(true);
  });
});
