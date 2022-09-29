import { useState, useEffect } from "react";
import { UpdateProductForm } from "./dashboard/updateProductForm";
import axios from "axios";

export function ListProduct({ product, resetProductList }) {
  const [showForm, setShowForm] = useState(false);

  const removeSelectedProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/products?id=${productId}`);
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <p>
        {product.productName} - {product.cost} - {product.amountAvailable}
        <button
          style={{ margin: "0 1rem" }}
          onClick={() => {
            setShowForm(!showForm);
          }}
        >
          modify
        </button>
        <button
          style={{ margin: "0 .2rem" }}
          onClick={async () => {
            await removeSelectedProduct(product.id);
            resetProductList(true);
          }}
        >
          remove
        </button>
      </p>
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
