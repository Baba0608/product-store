import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { toastNotifyError, toastNotifySuccess } from "../utils/toast-notify";
import { Shimmer } from "./Shimmer";
import { Header } from "./Header";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

export const Product = () => {
  const [product, setProduct] = useState(null);

  const { productId } = useParams();

  const fetchProduct = async () => {
    const { data } = await axios.get(`${BACKEND_API}/product/${productId}`);

    setProduct(data.result);
  };

  const addToCart = async () => {
    try {
      await axios.post(
        `${BACKEND_API}/cart/add-to-cart`,
        {
          productId: product._id,
        },
        { headers: { authorization: localStorage.getItem("store-token") } }
      );

      toastNotifySuccess("Product Added to cart.");
    } catch (err) {
      console.log(err);
      toastNotifyError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  console.log(product);
  if (!product) {
    return <Shimmer />;
  }

  return (
    <div>
      <Header />
      <div className="single-product">
        <div className="single-product-image">
          <img src={product.imageURL} />
        </div>

        <div>
          <p>
            <span>Name</span> : {product.productName}
          </p>
          <p>
            <span>Brand</span> : {product.brand}
          </p>
          <p>
            <span>Available</span> : {product.available ? "True" : "False"}
          </p>
          <p>
            <span>No.of products available</span> : {product.count}
          </p>
          <p>
            <span>Cost</span> : {product.cost} Rs/-
          </p>
          <p>
            <span>Description</span>
          </p>
          <p>{product.description}</p>
        </div>

        <div>
          <button className="add-to-cart" onClick={addToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
