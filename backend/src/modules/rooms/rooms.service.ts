import { listRooms } from "./rooms.repository.js";

type RoomRecord = {
  id: string;
  code: string;
  roomType: string;
  nightlyRate: number;
  currency: string;
  amenities: string[];
};

export function filterRoomsByPrice<T extends { nightlyRate: number }>(rooms: T[], minPrice?: number, maxPrice?: number): T[] {
  return rooms.filter((room) => {
    if (minPrice !== undefined && room.nightlyRate < minPrice) return false;
    if (maxPrice !== undefined && room.nightlyRate > maxPrice) return false;
    return true;
  });
}

export async function findAvailableRooms(params: {
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
}): Promise<RoomRecord[]> {
  const rooms = await listRooms();
  const byPrice = filterRoomsByPrice(rooms, params.minPrice, params.maxPrice);
  if (!params.amenities || params.amenities.length === 0) return byPrice;
  return byPrice.filter((room) => params.amenities!.every((a) => room.amenities.includes(a)));
}
