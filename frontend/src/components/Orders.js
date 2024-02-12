import { useEffect, useState } from "react";
import axios from "axios";

import { Header } from "./Header";
import { Shimmer } from "./Shimmer";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

export const Orders = () => {
  const [myOrders, setMyOrders] = useState(null);

  const fetchOrders = async () => {
    const { data } = await axios.get(`${BACKEND_API}/order/get-all-orders`, {
      headers: { authorization: localStorage.getItem("store-token") },
    });

    setMyOrders(data.orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (!myOrders) {
    return <Shimmer />;
  }

  return (
    <div>
      <Header />

      <div>
        <p>My orders</p>
      </div>
    </div>
  );
};
