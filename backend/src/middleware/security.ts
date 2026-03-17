import helmet from "helmet";
import rateLimit from "express-rate-limit";
import type { Application } from "express";

export function applySecurityMiddleware(app: Application): void {
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 600,
      standardHeaders: true,
      legacyHeaders: false
    })
  );
}
