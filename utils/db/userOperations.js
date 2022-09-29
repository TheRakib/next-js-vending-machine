import { PrismaClient } from "@prisma/client";
import { addCoinSchemaWithId, buyProductSchemaWithId } from "./zodSchema";

const prisma = new PrismaClient();

export const addCoin = async (depositInfo) => {
  addCoinSchemaWithId.parse(depositInfo);
  const { id, value } = depositInfo;
  const item = await prisma.user.update({
    where: { id: id },
    data: { deposit: { increment: value } },
  });

  return item;
};

export const getDeposit = async (userSub) => {
  if (typeof userSub !== "string" || userSub === "") {
    throw new Error("USER ID IS REQUIRED AND CANNOT BE EMPTY.");
  }

  const item = await prisma.user.findUnique({
    where: { id: userSub },
  });

  if (!item?.deposit) return 0;
  return item.deposit;
};

export const resetDeposit = async (userSub) => {
  if (typeof userSub !== "string" || userSub === "") {
    throw new Error("USER ID IS REQUIRED AND CANNOT BE EMPTY");
  }
  const item = await prisma.user.update({
    where: { id: userSub },
    data: { deposit: 0 },
  });

  return item;
};

const changeFormatter = (value) => {
  const coins = [100, 50, 20, 10, 5];
  const formattedArray = [];

  let remainedValue = value;
  for (const coin of coins) {
    const quotient = Math.floor(remainedValue / coin);
    console.log({ quotient, remainedValue, coin });
    remainedValue = remainedValue - quotient * coin;
    if (remainedValue >= 0) {
      formattedArray.push(...Array(quotient).fill(coin));
    }
    console.log({ remainedValue, formattedArray });
  }

  return formattedArray;
};

export const buyProduct = async (userSub, productId, requestedAmount) => {
  try {
    buyProductSchemaWithId.parse({ id: userSub, productId, requestedAmount });

    const userInfo = await prisma.user.findUnique({ where: { id: userSub } });
    if (!userInfo) throw new Error("USER DOES NOT EXIST");

    const productInfo = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!productInfo) throw new Error("PRODUCT DOES NOT EXIST");

    const { productName, cost, amountAvailable } = productInfo;
    const { deposit } = userInfo;
    const totalPrice = cost * requestedAmount;

    if (requestedAmount > amountAvailable) {
      throw new Error("REQUESTED AMOUNT IS NOT AVAILABLE");
    }

    if (totalPrice > deposit) throw new Error("INSUFFICIENT DEPOSIT");
    const change = deposit - totalPrice;
    const formattedChange = changeFormatter(change);

    return {
      error: null,
      result: {
        purchasedProduct: productName,
        change: formattedChange,
        totalChange: change,
      },
    };
  } catch (error) {
    return { error: error?.message, result: null };
  }
};
