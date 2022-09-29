import { useState, useEffect } from "react";
import axios from "axios";

const status = {
  loading: "loading",
  success: "success",
  failed: "failed",
};

const useProducts = () => {
  const [productList, setProductList] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(status.loading);
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    if (refetch)
      axios
        .get("http://localhost:3000/api/products")
        .then(({ data }) => {
          setProductList(data.products);
          setFetchStatus(status.success);
          setRefetch(false);
        })
        .catch((error) => {
          console.error({ error });
          setFetchStatus(status.failed);
        });
    // return () => {};
  }, [refetch]);

  return { productList, fetchStatus, setRefetch };
};

export { useProducts };
