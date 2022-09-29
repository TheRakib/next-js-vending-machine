import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { resetDeposit } from "../../utils/db/userOperations";
import { testAuth } from "../../utils/helper/authValidation";
import { checkAndPrintError } from "../../utils/helper/errorCheck";

export default async function Reset(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  try {
    const { method } = req;
    switch (method) {
      case "GET":
        testAuth(session, "BUYER");
        await resetDeposit(session.user.sub);
        res.status(200).json({ message: "success" });
        break;

      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    checkAndPrintError(error);
    res.status(401).send("Please log in.");
  }
}
