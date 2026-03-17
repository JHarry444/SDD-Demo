import { Router } from "express";
import { z } from "zod";
import { findAvailableRooms } from "./rooms.service.js";

const querySchema = z.object({
  checkIn: z.string().date(),
  checkOut: z.string().date(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  amenities: z
    .string()
    .optional()
    .transform((v) => (v ? v.split(",").filter(Boolean) : undefined))
});

export const roomsRouter = Router();

roomsRouter.get("/", async (req, res, next) => {
  try {
    const q = querySchema.parse(req.query);
    const items = await findAvailableRooms({
      minPrice: q.minPrice,
      maxPrice: q.maxPrice,
      amenities: q.amenities
    });
    res.status(200).json({ items });
  } catch (error) {
    next(error);
  }
});
