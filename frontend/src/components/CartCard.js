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
            },
            {
              headers: { authorization: localStorage.getItem("store-token") },
            }
          );

          console.log(resObj.product._id);
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
    <div className="cart-card">
      <div className="cart-card-image">
        <img src={resObj.product.imageURL} />
      </div>

      <div className="cart-card-details">
        <p>Name : {resObj.product.productName}</p>
        <p>Brand : {resObj.product.brand}</p>
        <p>Available: {resObj.product.available ? "True" : "False"}</p>
        <p>No.of products available : {resObj.product.count}</p>
        <p>Cost : {resObj.product.cost} Rs/-</p>
        <p>Quantity</p>
        <div className="quantity">
          <button
            className="decrease"
            disabled={quantity === 0}
            onClick={() => {
              setQuantity(quantity - 1);
            }}
          >
            -
          </button>
          <div className="quantity-value">{quantity}</div>
          <button
            className="increase"
            disabled={quantity === resObj.product.count}
            onClick={() => {
              setQuantity(quantity + 1);
            }}
          >
            +
          </button>
        </div>

        <div className="cart-btns">
          <Button
            className={"remove-from-cart"}
            functionOnClick={removeFromCart}
            id={"remove-from-cart"}
            content={"Remove from cart"}
          />

          <Button
            className={"buy-product"}
            id={"buy-product"}
            functionOnClick={buyProduct}
            content={"Buy"}
          />
        </div>
      </div>
    </div>
  );
};
