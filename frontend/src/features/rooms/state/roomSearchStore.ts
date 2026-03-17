type RoomSearchState = {
  checkIn: string;
  checkOut: string;
  minPrice?: number;
  maxPrice?: number;
  amenities: string[];
};

let state: RoomSearchState = {
  checkIn: "",
  checkOut: "",
  amenities: []
};

export function setRoomSearchState(next: Partial<RoomSearchState>): RoomSearchState {
  state = { ...state, ...next };
  return state;
}

export function getRoomSearchState(): RoomSearchState {
  return state;
}
