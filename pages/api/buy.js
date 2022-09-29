import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { buyProduct } from "../../utils/db/userOperations";
import { checkAndPrintError } from "../../utils/helper/errorCheck";
import { testAuth } from "../../utils/helper/authValidation";

export default async function Buy(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  try {
    const {
      method,
      body: { productId, requestedAmount },
    } = req;

    switch (method) {
      case "POST":
        testAuth(session, "BUYER");
        const { error, result: purchaseInfo } = await buyProduct(
          session.user.sub,
          productId,
          requestedAmount
        );
        const message = error ? "failed" : "success";
        res.status(200).json({ message, info: purchaseInfo, error });
        break;

      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    checkAndPrintError(error);
    res.status(401).send("Please log in.");
  }
}
