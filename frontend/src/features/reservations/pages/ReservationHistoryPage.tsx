import { useEffect, useState } from "react";
import { apiFetch } from "../../../services/apiClient";

type Reservation = {
  id: string;
  status: string;
  checkInDate: string;
  checkOutDate: string;
};

export function ReservationHistoryPage() {
  const [items, setItems] = useState<Reservation[]>([]);

  useEffect(() => {
    apiFetch<{ items: Reservation[] }>("/reservations")
      .then((data) => setItems(data.items))
      .catch(() => setItems([]));
  }, []);

  return (
    <section>
      <h2>My Reservations</h2>
      <ul>
        {items.map((r) => (
          <li key={r.id}>
            {r.id} - {r.status}
          </li>
        ))}
      </ul>
    </section>
  );
}
