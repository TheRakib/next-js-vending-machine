import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema } from "../../utils/db/zodSchema";
import axios from "axios";

export function AddProductForm({ resetProductList }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProductSchema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3000/api/products", {
        ...data,
      });
      resetProductList(true);
    } catch (error) {
      console.error({
        message: "Something went wrong!", // error: error?.message,
      });
    }
  };

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <h2>Add new product</h2>
      <form style={{ zoom: "1.5" }} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("productName", { required: true })}
          placeholder="Product Name"
        />
        {errors?.productName?.message && <p>{errors.productName.message}</p>}
        <br />
        <input
          {...register("cost", { required: true, valueAsNumber: true })}
          placeholder="Cost per unit (multiple of 5)"
          type="number"
          min={5}
          step={5}
        />
        {errors?.cost?.message && <p>{errors.cost.message}</p>}
        <br />
        <input
          {...register("amountAvailable", {
            required: true,
            valueAsNumber: true,
          })}
          placeholder="Amount available"
          type="number"
          step={1}
        />
        {errors?.amountAvailable?.message && (
          <p>{errors.amountAvailable.message}</p>
        )}
        <br />
        <br />
        <input type="submit" value="ADD" />
      </form>
      <br />
    </div>
  );
}
