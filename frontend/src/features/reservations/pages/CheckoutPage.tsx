import { useState } from "react";
import { apiFetch } from "../../../services/apiClient";

export function CheckoutPage() {
  const [status, setStatus] = useState("");

  async function handleCreateReservation() {
    const reservation = await apiFetch<{ status: string }>("/reservations", {
      method: "POST",
      body: JSON.stringify({
        roomId: "r1",
        checkInDate: "2026-04-01",
        checkOutDate: "2026-04-03",
        guestCount: 2
      })
    });
    setStatus(reservation.status);
  }

  return (
    <section>
      <h2>Checkout</h2>
      <button onClick={handleCreateReservation}>Create reservation</button>
      <p>{status}</p>
    </section>
  );
}
