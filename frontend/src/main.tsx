import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthPages } from "./features/auth/pages/AuthPages";
import { RoomSearchPage } from "./features/rooms/pages/RoomSearchPage";
import { CheckoutPage } from "./features/reservations/pages/CheckoutPage";
import { ReservationHistoryPage } from "./features/reservations/pages/ReservationHistoryPage";
import { AdminConsolePage } from "./features/admin/pages/AdminConsolePage";

function Home() {
  return <h1>QA Hotel</h1>;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPages />} />
        <Route path="/rooms" element={<RoomSearchPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/reservations" element={<ReservationHistoryPage />} />
        <Route path="/admin" element={<AdminConsolePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
