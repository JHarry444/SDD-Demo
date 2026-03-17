import { describe, expect, it } from "vitest";
import { filterRoomsByPrice } from "../../src/modules/rooms/rooms.service.js";

describe("rooms.service", () => {
  it("filters by price range", () => {
    const rooms = [
      { nightlyRate: 100 },
      { nightlyRate: 200 },
      { nightlyRate: 300 }
    ];
    const out = filterRoomsByPrice(rooms, 150, 250);
    expect(out).toHaveLength(1);
  });
});
