import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProductSchema } from "../../utils/db/zodSchema";
import axios from "axios";

export function UpdateProductForm({ product, resetProductList, setShowForm }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProductSchema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.put("http://localhost:3000/api/products", {
        ...data,
        id: product.id,
      });
      setShowForm(false);
      resetProductList(true);
    } catch (error) {
      console.error({
        message: "Something went wrong!", // error: error?.message,
      });
    }
  };

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <h2>Update Product Info</h2>
      <form style={{ zoom: "1.5" }} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("productName", { required: true })}
          placeholder="Product Name"
          defaultValue={product.productName}
        />
        {errors?.productName?.message && <p>{errors.productName.message}</p>}
        <br />
        <input
          {...register("cost", { required: true, valueAsNumber: true })}
          placeholder="Cost per unit (multiple of 5)"
          type="number"
          min={5}
          step={5}
          defaultValue={product.cost}
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
          setp={1}
          defaultValue={product.amountAvailable}
        />
        {errors?.amountAvailable?.message && (
          <p>{errors.amountAvailable.message}</p>
        )}
        <br />
        <br />
        <input type="submit" value="update" />
      </form>
      <br />
    </div>
  );
}
