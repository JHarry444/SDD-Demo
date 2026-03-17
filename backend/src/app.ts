import express from "express";
import { applySecurityMiddleware } from "./middleware/security.js";
import { applySessionMiddleware } from "./middleware/session.js";
import { errorHandler, notFoundHandler } from "./middleware/error-handler.js";
import { observabilityMiddleware } from "./middleware/observability.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { roomsRouter } from "./modules/rooms/rooms.routes.js";
import { reservationsRouter } from "./modules/reservations/reservations.routes.js";
import { adminRouter } from "./modules/admin/admin.routes.js";
import { startPaymentScheduler } from "./modules/payments/payments.scheduler.js";

const app = express();

app.use(express.json());
app.use(observabilityMiddleware);
applySecurityMiddleware(app);
applySessionMiddleware(app);
app.use("/auth", authRouter);
app.use("/rooms", roomsRouter);
app.use("/reservations", reservationsRouter);
app.use("/admin", adminRouter);

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use(notFoundHandler);
app.use(errorHandler);

const port = Number(process.env.PORT || 4000);

if (process.env.NODE_ENV !== "test") {
  startPaymentScheduler();
  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
  });
}

export default app;
