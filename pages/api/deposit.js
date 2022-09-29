import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { addCoin } from "../../utils/db/userOperations";
import { ZodError } from "zod";
import { testAuth } from "../../utils/helper/authValidation";

export default async function Products(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  try {
    const { method, body } = req;
    switch (method) {
      case "POST":
        testAuth(session, "BUYER");
        const depositInfo = await addCoin({
          value: body.value,
          id: session.user.sub,
        });
        res.status(200).json({ message: "success", info: depositInfo });
        break;

      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(error.issues);
    } else {
      console.error({ error });
    }
    res.status(401).send("Please log in.");
  }
}
