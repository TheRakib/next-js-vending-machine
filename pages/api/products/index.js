import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { testAuth } from "../../../utils/helper/authValidation";
import {
  addProduct,
  getProducts,
  updateProduct,
  removeProduct,
} from "../../../utils/db/productOperations";
import { ZodError } from "zod";

export default async function Products(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  try {
    const { query, method, body: productInfo } = req;
    switch (method) {
      case "GET":
        const productList = await getProducts();
        res.status(200).json({ products: productList });
        break;

      case "POST":
        testAuth(session, "SELLER");
        const addedProductInfo = await addProduct({
          ...productInfo,
          userId: session.user.sub,
        });
        res.status(200).json({ message: "success", info: addedProductInfo });
        break;

      case "PUT":
        testAuth(session, "SELLER");
        const updatedProductInfo = await updateProduct(productInfo);
        res.status(200).json({ message: "success", info: updatedProductInfo });
        break;

      case "DELETE":
        testAuth(session, "SELLER");
        const deletedProductInfo = await removeProduct(query.id);
        res.status(200).json({ message: "success", info: deletedProductInfo });
        break;

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(error.issues);
    }
    console.error({ error });
    res.status(401).send("Please log in.");
  }
}
