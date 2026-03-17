import { Router } from "express";
import { z } from "zod";
import { requireAdmin } from "./admin-authz.middleware.js";
import { buildOccupancyReport } from "./admin.service.js";

const roomSchema = z.object({
  code: z.string().min(1),
  roomType: z.string().min(1),
  nightlyRate: z.number().nonnegative(),
  currency: z.string().min(3),
  maxGuests: z.number().int().positive(),
  status: z.enum(["active", "inactive", "maintenance"]),
  amenities: z.array(z.string()).optional()
});

const querySchema = z.object({
  startDate: z.string().date(),
  endDate: z.string().date()
});

export const adminRouter = Router();

adminRouter.post("/rooms", requireAdmin, (req, res, next) => {
  try {
    const room = roomSchema.parse(req.body);
    res.status(200).json({ id: "admin-room", ...room });
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/reports/occupancy", (_req, res, next) => {
  try {
    const q = querySchema.parse(_req.query);
    const report = buildOccupancyReport(q.startDate, q.endDate);
    res.status(200).json(report);
  } catch (error) {
    next(error);
  }
});
