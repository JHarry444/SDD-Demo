import { Router } from "express";
import { z } from "zod";
import { ApiError } from "../../middleware/error-handler.js";
import { login, signup, verifyEmailByToken } from "./auth.service.js";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

const verifySchema = z.object({
  token: z.string().min(1)
});

const recoverySchema = z.object({
  email: z.string().email()
});

export const authRouter = Router();

authRouter.post("/signup", async (req, res, next) => {
  try {
    const data = signupSchema.parse(req.body);
    const user = await signup(data.email, data.password);
    res.status(201).json({ message: "Account created", userId: user.id });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/verify-email", async (req, res, next) => {
  try {
    const data = verifySchema.parse(req.body);
    await verifyEmailByToken(data.token);
    res.status(200).json({ message: "Email verified" });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await login(data.email, data.password);
    req.session.regenerate((sessionError) => {
      if (sessionError) {
        next(new ApiError(500, "SESSION_ERROR", "Could not start session"));
        return;
      }
      req.session.userId = user.id;
      req.session.role = "user";
      res.status(200).json({
        session: { expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() },
        principal: { type: "user", id: user.id, email: user.email }
      });
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/password-recovery", (req, res, next) => {
  try {
    recoverySchema.parse(req.body);
    res.status(202).json({ message: "Recovery accepted" });
  } catch (error) {
    next(error);
  }
});
