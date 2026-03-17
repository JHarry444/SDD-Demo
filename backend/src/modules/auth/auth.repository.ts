import { prisma } from "../../config/db.js";

export async function createPendingUser(email: string, passwordHash: string) {
  return prisma.userAccount.create({
    data: {
      email,
      passwordHash,
      status: "pending_verification"
    }
  });
}

export async function findUserByEmail(email: string) {
  return prisma.userAccount.findUnique({ where: { email } });
}

export async function markUserVerified(userId: string) {
  return prisma.userAccount.update({
    where: { id: userId },
    data: { emailVerifiedAt: new Date(), status: "active" }
  });
}
