import { PrismaClient } from "@prisma/client";
import {
  createProductSchemaWithId,
  updateProductSchemaWithId,
} from "./zodSchema";

const prisma = new PrismaClient();

export const getProducts = async () => {
  const items = await prisma.product.findMany();
  return items;
};

export const addProduct = async (productInfo) => {
  createProductSchemaWithId.parse(productInfo);
  const item = await prisma.product.create({
    data: { ...productInfo },
  });

  return item;
};

export const updateProduct = async (productInfo) => {
  updateProductSchemaWithId.parse(productInfo);
  const { id, ...rest } = productInfo;
  const item = await prisma.product.update({
    where: { id: productInfo.id },
    data: { ...rest },
  });

  return item;
};

export const removeProduct = async (productId) => {
  if (typeof productId !== "string" || productId === "") {
    throw new Error("ID IS REQUIRED AND CANNOT BE EMPTY.");
  }
  const item = await prisma.product.delete({
    where: { id: productId },
  });

  return item;
};
