import { useEffect, useState } from "react";
import { apiFetch } from "../../../services/apiClient";

type Room = {
  id: string;
  code: string;
  roomType: string;
  nightlyRate: number;
  currency: string;
  amenities: string[];
};

export function RoomSearchPage() {
  const [items, setItems] = useState<Room[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch<{ items: Room[] }>("/rooms?checkIn=2026-04-01&checkOut=2026-04-03")
      .then((data) => setItems(data.items))
      .catch((e: Error) => setError(e.message));
  }, []);

  return (
    <section>
      <h2>Available Rooms</h2>
      {error ? <p>{error}</p> : null}
      <ul>
        {items.map((room) => (
          <li key={room.id}>
            {room.code} - {room.roomType} - {room.currency} {room.nightlyRate}
          </li>
        ))}
      </ul>
    </section>
  );
}
