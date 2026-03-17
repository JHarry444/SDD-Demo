import type { NextFunction, Request, Response } from "express";

export class ApiError extends Error {
  statusCode: number;
  code: string;

  constructor(statusCode: number, code: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

export function notFoundHandler(_req: Request, _res: Response, next: NextFunction): void {
  next(new ApiError(404, "NOT_FOUND", "Resource not found"));
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ code: err.code, message: err.message });
    return;
  }
  res.status(500).json({ code: "INTERNAL_ERROR", message: "Unexpected server error" });
}
