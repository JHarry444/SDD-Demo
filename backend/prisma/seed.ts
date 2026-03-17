import { prisma } from "../src/config/db.js";

async function main(): Promise<void> {
  console.log("Seed placeholder: add fixture data when feature modules are implemented.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
