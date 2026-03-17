import { Router } from "express";
import { z } from "zod";
import { createPendingReservation, getUserReservations } from "./reservations.service.js";
import { reservationManagementRouter } from "./reservation-management.routes.js";

const createSchema = z.object({
  roomId: z.string().min(1),
  checkInDate: z.string().date(),
  checkOutDate: z.string().date(),
  guestCount: z.number().int().positive()
});

export const reservationsRouter = Router();

reservationsRouter.use("/", reservationManagementRouter);

reservationsRouter.post("/", async (req, res, next) => {
  try {
    const input = createSchema.parse(req.body);
    const reservation = await createPendingReservation({
      ...input,
      userId: req.session.userId || "anonymous"
    });
    res.status(201).json(reservation);
  } catch (error) {
    next(error);
  }
});

reservationsRouter.get("/", async (req, res, next) => {
  try {
    const items = await getUserReservations(req.session.userId || "anonymous");
    res.status(200).json({ items });
  } catch (error) {
    next(error);
  }
});
