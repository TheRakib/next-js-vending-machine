import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { faker } from "@faker-js/faker";

export default async function FakeWithAuth(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    const randomUser = {
      id: faker.datatype.uuid(),
      name: faker.internet.userName(),
      email: faker.internet.email(),
    };
    res.status(200).json({ ...randomUser, session });
  } else {
    res.status(401).json({
      error: "Please log in...",
    });
  }
}
