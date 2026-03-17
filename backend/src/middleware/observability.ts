import type { NextFunction, Request, Response } from "express";
import { randomUUID } from "node:crypto";

export function observabilityMiddleware(req: Request, res: Response, next: NextFunction): void {
  const requestId = randomUUID();
  const start = Date.now();
  res.setHeader("x-request-id", requestId);
  res.on("finish", () => {
    const durationMs = Date.now() - start;
    console.log(JSON.stringify({ requestId, method: req.method, path: req.path, status: res.statusCode, durationMs }));
  });
  next();
}
