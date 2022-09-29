import * as z from "zod";

export const createProductSchema = z.object({
  productName: z.string().min(1),
  amountAvailable: z.number().int().positive().min(1),
  cost: z.number().int().positive().min(5).multipleOf(5),
});

export const createProductSchemaWithId = createProductSchema.extend({
  userId: z.string().min(1),
});

export const updateProductSchema = z.object({
  productName: z.string().min(1),
  amountAvailable: z.number().int().positive().min(1),
  cost: z.number().int().positive().min(5).multipleOf(5),
});

export const updateProductSchemaWithId = updateProductSchema.extend({
  id: z.string().min(1),
});

export const addCoinSchema = z.object({
  value: z
    .number()
    .int()
    .positive()
    .min(5)
    .multipleOf(5)
    .refine((val) => [5, 10, 20, 50, 100].includes(val), {
      message: "String can't be more than 255 characters",
    }),
});

export const addCoinSchemaWithId = addCoinSchema.extend({
  id: z.string().min(1),
});

export const buyProductSchema = z.object({
  requestedAmount: z.number().int().positive().min(1),
});

export const buyProductSchemaWithId = buyProductSchema.extend({
  id: z.string().min(1),
  productId: z.string().min(1),
});
