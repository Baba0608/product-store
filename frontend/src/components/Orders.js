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
  console.log(myOrders);
  return (
    <div>
      <Header />

      <div className="orders-table">
        <table>
          <tr>
            <th>Order id</th>
            <th>Product name</th>
            <th>cost</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Payment status</th>
          </tr>

          {myOrders.map((order) => {
            return (
              <tr key={order._id}>
                <td>{order.orderId}</td>
                <td>{order.products[0].productName}</td>
                <td>{order.products[0].cost}</td>
                <td>{order.products[0].quantity}</td>
                <td>{order.amount ? order.amount : "--"}</td>
                <td>
                  {order.paymentStatus != "PENDING"
                    ? order.paymentStatus
                    : "FAILED"}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};
