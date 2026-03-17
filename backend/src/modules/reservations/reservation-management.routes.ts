import { Router } from "express";
import { canCancelReservation, canModifyReservation } from "./reservation-policy.service.js";

export const reservationManagementRouter = Router();

reservationManagementRouter.patch("/:reservationId/modify", (req, res) => {
  const status = "confirmed";
  if (!canModifyReservation(status)) {
    res.status(409).json({ code: "MODIFY_NOT_ALLOWED", message: "Reservation cannot be modified" });
    return;
  }
  res.status(200).json({ id: req.params.reservationId, status, modified: true });
});

reservationManagementRouter.post("/:reservationId/cancel", (req, res) => {
  const status = "confirmed";
  if (!canCancelReservation(status)) {
    res.status(409).json({ code: "CANCEL_NOT_ALLOWED", message: "Reservation cannot be cancelled" });
    return;
  }
  res.status(200).json({ id: req.params.reservationId, status: "cancelled" });
});
