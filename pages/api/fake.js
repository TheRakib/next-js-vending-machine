import { faker } from "@faker-js/faker";

export default async function handler(req, res) {
  const randomUser = {
    id: faker.datatype.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    role: "BUYER",
  };
  res.status(200).json({ ...randomUser });
}
