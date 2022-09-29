import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buyProductSchema } from "../utils/db/zodSchema";
import { UpdateProductForm } from "./dashboard/updateProductForm";
import axios from "axios";

export function PurchasableProduct({
  product,
  resetProductList,
  setPurchasedProduct,
}) {
  const [showForm, setShowForm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(buyProductSchema),
  });

  const buySelectedProduct = async (data) => {
    // console.log({ data });
    try {
      const res = await axios.post(`http://localhost:3000/api/buy`, {
        ...data,
        productId: product.id,
      });

      const { error, info } = await res.data;
      if (!error) setPurchasedProduct(info);
      console.log({ error, ...info });
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        zoom: "1.2",
        margin: "0",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>
          {product.productName} - {product.cost} - {product.amountAvailable}
        </p>
        <form
          style={{ display: "inline-block" }}
          onSubmit={handleSubmit(buySelectedProduct)}
        >
          <input
            {...register("requestedAmount", {
              required: true,
              valueAsNumber: true,
            })}
            style={{ width: "3.5rem", margin: "0 .5rem" }}
            placeholder="5"
            type="number"
            min={1}
            step={1}
          />
          <input type="submit" value="Buy" />
        </form>
      </div>
      {errors?.requestedAmount?.message && (
        <p style={{ color: "red" }}>{errors.requestedAmount.message}</p>
      )}
      <>
        {showForm && (
          <UpdateProductForm
            product={product}
            setShowForm={setShowForm}
            resetProductList={resetProductList}
          />
        )}
      </>
    </div>
  );
}
