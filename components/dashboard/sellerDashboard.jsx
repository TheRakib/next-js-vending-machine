import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { ListProduct } from "../listProducts";
import { AddProductForm } from "./addProductForm";

export function SellerDashboard() {
  const [showAddForm, setShowAddForm] = useState(false);
  const { productList, fetchStatus, setRefetch } = useProducts();
  return (
    <>
      <div>
        <button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? "❌ Close Form" : "➕ Add Product"}
        </button>
        {showAddForm && <AddProductForm resetProductList={setRefetch} />}
      </div>
      <main>
        {fetchStatus === "success" &&
          productList.map((product, idx) => (
            <ListProduct
              key={idx}
              product={product}
              resetProductList={setRefetch}
            />
          ))}
      </main>
    </>
  );
}
