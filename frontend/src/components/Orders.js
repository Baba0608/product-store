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

      <div className="orders-table m-4 flex justify-center w-[95%] mt-20 pt-4">
        <table className="border-2 border-collapse border-gray-700 text-sm w-[100%] sm:w-[600px]">
          <tr>
            <th className="border-2 min-w-5 px-4 py-1 bg-green-500 border-gray-700">
              Product name
            </th>

            <th className="border-2 min-w-5 px-4 py-1 bg-green-500 border-gray-700">
              Amount
            </th>

            <th className="border-2 min-w-5 px-4 py-1 bg-green-500 border-gray-700">
              Payment status
            </th>
          </tr>

          {myOrders.map((order) => {
            return (
              <tr key={order._id}>
                <td className="border-2 border-gray-700 min-w-5 px-4 py-1 bg-green-300 text-center">
                  {order.products[0].productName}
                </td>

                <td className="border-2 border-gray-700 min-w-5 px-4 py-1 bg-green-300 text-center">
                  {order.products[0].cost}
                </td>

                <td className="border-2 border-gray-700 min-w-5 px-4 py-1 bg-green-300 text-center">
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
