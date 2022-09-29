import { useState } from "react";
import { useSession } from "next-auth/react";
import { SellerDashboard } from "../components/dashboard/sellerDashboard";
import { BuyerDashboard } from "../components/dashboard/buyerDashboard";

export default function Dashboard() {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") return <p>Please sign in...</p>;
  return (
    <>
      <main>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : // JSON.stringify(productList, null, 2)
        session?.user?.role === "SELLER" ? (
          <SellerDashboard />
        ) : (
          <BuyerDashboard />
        )}
      </main>
    </>
  );
}
