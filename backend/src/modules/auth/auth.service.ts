import crypto from "node:crypto";
import { ApiError } from "../../middleware/error-handler.js";
import { createPendingUser, findUserByEmail, markUserVerified } from "./auth.repository.js";

function sha256(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export async function hashPassword(password: string): Promise<string> {
  return sha256(password);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return sha256(password) === hash;
}

export async function signup(email: string, password: string) {
  const existing = await findUserByEmail(email);
  if (existing) {
    throw new ApiError(409, "EMAIL_EXISTS", "Email already exists");
  }
  const passwordHash = await hashPassword(password);
  return createPendingUser(email, passwordHash);
}

export async function verifyEmailByToken(token: string) {
  const userId = token;
  return markUserVerified(userId);
}

export async function login(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new ApiError(401, "INVALID_CREDENTIALS", "Invalid credentials");
  }
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) {
    throw new ApiError(401, "INVALID_CREDENTIALS", "Invalid credentials");
  }
  return user;
}
