import axios from "axios";
import { useNavigate } from "react-router-dom";

import { toastNotifySuccess, toastNotifyError } from "../utils/toast-notify";
import { Button } from "./Button";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

export const Card = ({ resObj, isAdmin, removeProduct }) => {
  const addToCart = async () => {
    try {
      await axios.post(
        `${BACKEND_API}/cart/add-to-cart`,
        {
          productId: resObj._id,
        },
        { headers: { authorization: localStorage.getItem("store-token") } }
      );

      toastNotifySuccess("Product Added to cart.");
    } catch (err) {
      console.log(err);
      toastNotifyError("Something went wrong");
    }
  };

  const deleteProduct = async () => {
    try {
      await axios.delete(
        `${BACKEND_API}/product/delete-product/${resObj._id}`,
        {
          headers: { authorization: localStorage.getItem("store-token") },
        }
      );
      toastNotifySuccess("Product Deleted.");
      removeProduct(resObj);
    } catch (err) {
      console.log(err);
      toastNotifyError("Something went wrong.");
    }
  };

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/user/product/${resObj._id}`;
    navigate(path);
  };

  const updateRoute = () => {
    let path = `/admin/update-product/${resObj._id}`;
    navigate(path);
  };
  return (
    <div className="card">
      <div className="product-image">
        <img src={resObj.imageURL} />
      </div>

      <div className="product-details">
        <p>Name : {resObj.productName}</p>
        <p>Cost : {resObj.cost} Rs/-</p>
        <p>Brand : {resObj.brand}</p>
        <p>Availabe : {resObj.available ? "True" : "False"}</p>
      </div>

      <div className="cart-btn">
        <Button
          className={isAdmin ? "update-product" : "add-to-cart"}
          functionOnClick={isAdmin ? updateRoute : addToCart}
          content={isAdmin ? "Update Product" : "Add to Cart"}
        />

        <Button
          className={isAdmin ? "delete-product" : "view-product"}
          functionOnClick={isAdmin ? deleteProduct : routeChange}
          content={isAdmin ? "Delete Product" : "View"}
        />
      </div>
    </div>
  );
};
