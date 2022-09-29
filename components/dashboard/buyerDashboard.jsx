import { useState } from "react";
import { useUserinfo } from "../../hooks/useUserinfo";
import { useProducts } from "../../hooks/useProducts";
import { PurchasableProduct } from "../purchasableProduct";
import { DepositForm } from "./depositForm";
import axios from "axios";

export function BuyerDashboard() {
  const [purchasedProduct, setPurchasedProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { productList, fetchStatus, setRefetch } = useProducts();
  const {
    userInfo,
    fetchStatus: fetchUserStatus,
    setRefetch: setRefetchUserinfo,
  } = useUserinfo();
  const handleResetDeposit = async () => {
    try {
      await axios.get("http://localhost:3000/api/reset");
      setRefetchUserinfo(true);
    } catch (error) {
      console.error({
        message: "Something went wrong!",
        error: error,
      });
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <button onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? "❌ Close Form" : "➕ Deposit Coins"}
          </button>
          <button onClick={handleResetDeposit}>⚠️ reset deposit</button>
          {showAddForm && (
            <DepositForm setRefetchUserinfo={setRefetchUserinfo} />
          )}
        </div>
        <>
          {/* Currently this shows only deposit value but this will extended later */}
          {fetchUserStatus === "success" && (
            <p>{JSON.stringify(userInfo, null, 2)}</p>
          )}
        </>
      </div>
      <main>
        <p>
          {purchasedProduct &&
            `You have purchased ${purchasedProduct.purchasedProduct}.`}
          {purchasedProduct?.change.length > 0 &&
            `Your change is ${JSON.stringify(purchasedProduct.change)} .`}
          {purchasedProduct?.totalChange >= 0 &&
            ` Total change is ${purchasedProduct.totalChange}.`}
        </p>
        {fetchStatus === "success" &&
          productList.map((product, idx) => (
            <PurchasableProduct
              key={idx}
              product={product}
              resetProductList={setRefetch}
              setPurchasedProduct={setPurchasedProduct}
            />
          ))}
      </main>
    </>
  );
}
