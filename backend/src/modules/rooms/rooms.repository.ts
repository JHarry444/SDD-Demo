type RoomRecord = {
  id: string;
  code: string;
  roomType: string;
  nightlyRate: number;
  currency: string;
  amenities: string[];
};

const ROOM_FIXTURES: RoomRecord[] = [
  {
    id: "r1",
    code: "DLX-101",
    roomType: "Deluxe",
    nightlyRate: 180,
    currency: "USD",
    amenities: ["wifi", "breakfast"]
  },
  {
    id: "r2",
    code: "STD-201",
    roomType: "Standard",
    nightlyRate: 120,
    currency: "USD",
    amenities: ["wifi"]
  }
];

export async function listRooms(): Promise<RoomRecord[]> {
  return ROOM_FIXTURES;
}
