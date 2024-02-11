import axios from "axios";
import { toastNotifyError, toastNotifySuccess } from "../utils/toast-notify";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

export const CartCard = ({ resObj, deleteFromCart }) => {
  const removeFromCart = async () => {
    console.log(resObj.product._id);
    try {
      await axios.delete(
        `${BACKEND_API}/cart/delete-from-cart/${resObj.product._id}`,
        {
          headers: { authorization: localStorage.getItem("store-token") },
        }
      );
      deleteFromCart(resObj.product._id);
      toastNotifySuccess("Product removed from cart.");
    } catch (err) {
      console.log(err);
      toastNotifyError("Something went wrong.");
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
          <button className="decrease">-</button>
          <div className="quantity-value">1</div>
          <button className="increase">+</button>
        </div>

        <div className="cart-btns">
          <button id="remove-from-cart" onClick={removeFromCart}>
            Remove from cart
          </button>
          <button id="buy-product">Buy</button>
        </div>
      </div>
    </div>
  );
};
