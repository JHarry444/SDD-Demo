import session from "express-session";
import type { Application } from "express";

const oneDayMs = 24 * 60 * 60 * 1000;

export function applySessionMiddleware(app: Application): void {
  app.use(
    session({
      name: "qahotel_session",
      secret: process.env.SESSION_SECRET || "dev-secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: oneDayMs
      }
    })
  );
}
