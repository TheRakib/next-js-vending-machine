/**this file can be extended for other user information
 * not limited to deposit value */

import { useState, useEffect } from "react";
import axios from "axios";
const status = {
  loading: "loading",
  success: "success",
  failed: "failed",
};

const useUserinfo = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(status.loading);
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    if (refetch)
      axios
        .get("http://localhost:3000/api/whoami")
        .then(({ data }) => {
          setUserInfo(data.userData);
          setFetchStatus(status.success);
          setRefetch(false);
        })
        .catch((error) => {
          console.error({ error });
          setFetchStatus(status.failed);
        });
    // return () => {};
  }, [refetch]);

  return { userInfo, fetchStatus, setRefetch };
};

export { useUserinfo };
