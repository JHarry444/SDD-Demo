import { useState } from "react";
import { getOccupancyReport } from "../services/adminApi";

export function AdminConsolePage() {
  const [report, setReport] = useState<string>("");

  async function loadReport() {
    const data = await getOccupancyReport("2026-04-01", "2026-04-30");
    setReport(`Occupancy ${data.occupancyRate}% (${data.totalReservations})`);
  }

  return (
    <section>
      <h2>Admin Console</h2>
      <button onClick={loadReport}>Load occupancy report</button>
      <p>{report}</p>
    </section>
  );
}
