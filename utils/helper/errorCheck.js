import { ZodError } from "zod";

export const checkAndPrintError = (error) => {
  if (error instanceof ZodError) {
    console.error(error.issues);
  } else {
    console.error({ error });
  }
};
