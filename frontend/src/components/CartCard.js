import axios from "axios";
import useRazorpay from "react-razorpay";

import { toastNotifyError, toastNotifySuccess } from "../utils/toast-notify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

export const CartCard = ({ resObj, deleteFromCart }) => {
  const [Razorpay] = useRazorpay();
  const [quantity, setQuantity] = useState(+resObj.quantity);
  console.log(resObj);
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/user/home";
    navigate(path);
  };

  const removeFromCart = async (payment) => {
    try {
      await axios.delete(
        `${BACKEND_API}/cart/delete-from-cart/${resObj.product._id}`,
        {
          headers: { authorization: localStorage.getItem("store-token") },
        }
      );
      deleteFromCart(resObj.product._id);
      if (payment != "payment")
        toastNotifySuccess("Product removed from cart.");
    } catch (err) {
      console.log(err);
      if (payment != "payment") toastNotifyError("Something went wrong.");
    }
  };

  const product = JSON.parse(
    JSON.stringify(resObj.product, ["productName", "cost", "brand"])
  );

  const buyProduct = async () => {
    try {
      const { data } = await axios.post(
        `${BACKEND_API}/order/create-order`,
        {
          products: [{ ...product, quantity: quantity }],
          quantity: quantity,
        },
        { headers: { authorization: localStorage.getItem("store-token") } }
      );

      const options = {
        key: data.key_id,
        order_id: data.order.orderId,
        amount: data.amount,
        handler: async function (response) {
          const { data } = await axios.post(
            `${BACKEND_API}/order/update-payment-status`,
            {
              orderId: options.order_id,
              paymentId: response.razorpay_payment_id,
              amount: options.amount / 100,
              productId: resObj.product._id,
              quantity: quantity,
              count: resObj.product.count,
            },
            {
              headers: { authorization: localStorage.getItem("store-token") },
            }
          );

          removeFromCart("payment");
          toastNotifySuccess(
            "Payment Successfull. Your product will be delivered when I own the company."
          );

          routeChange();
        },
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();

      rzp1.on("payment.failed", (response) => {
        console.log(response);
        toastNotifyError("Paymeny Failed. Try again");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cart-card bg-gray-200 m-8 p-4 sm:flex sm:flex-row flex flex-col rounded-lg">
      <div className="flex w-[100%] sm:w-[250px] justify-center">
        <div className="cart-card-image w-[250px] h-[250px] mr-4 mb-4">
          <img
            className="w-[100%] h-[100%] rounded-lg"
            src={resObj.product.imageURL}
          />
        </div>
      </div>

      <div className="cart-card-details ">
        <p>Name : {resObj.product.productName}</p>
        <p>Brand : {resObj.product.brand}</p>
        <p>Available: {resObj.product.count != 0 ? "True" : "False"}</p>
        <p>No.of products available : {resObj.product.count}</p>
        <p>Cost : {resObj.product.cost} Rs/-</p>
        <p>Quantity</p>
        <div className="quantity flex my-2">
          <button
            className="decrease w-8 bg-orange-300 hover:bg-orange-400 text-lg flex justify-center"
            disabled={quantity === 0}
            onClick={() => {
              setQuantity(quantity - 1);
            }}
          >
            -
          </button>
          <div className="quantity-value w-12 flex justify-center bg-white">
            {resObj.product.count === 0 ? 0 : quantity}
          </div>
          <button
            className="increase w-8 bg-orange-300 hover:bg-orange-400 text-lg flex justify-center"
            disabled={quantity === resObj.product.count}
            onClick={() => {
              setQuantity(quantity + 1);
            }}
          >
            +
          </button>
        </div>

        <div className="md:flex md:justify-between md:w-[350px]">
          <Button
            className={"remove-from-cart"}
            functionOnClick={removeFromCart}
            content={"Remove from cart"}
          />

          <Button
            className={"buy-product"}
            functionOnClick={buyProduct}
            content={"Buy"}
            disabled={resObj.product.count === 0 || quantity === 0}
          />
        </div>
      </div>
    </div>
  );
};
