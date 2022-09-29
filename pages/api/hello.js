import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  async function main() {
    const allUsers = await prisma.product.create({
      data: {},
    });
    console.log(allUsers);
  }

  await main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });

  res.status(200).json({ name: "John Doe" });
}
