import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { toastNotifyError, toastNotifySuccess } from "../utils/toast-notify";
import { Shimmer } from "./Shimmer";
import { Header } from "./Header";
import { Button } from "./Button";

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

  if (!product) {
    return <Shimmer />;
  }

  return (
    <div>
      <Header />
      <div className="single-product m-4 mt-20 pt-4 text-lg">
        <div className="single-product-image flex justify-center mb-4">
          <img
            className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] rounded-lg"
            src={product.imageURL}
          />
        </div>

        <div>
          <p>
            <span>Name</span> : {product.productName}
          </p>
          <p>
            <span>Brand</span> : {product.brand}
          </p>
          <p>
            <span>Available</span> : {product.count != 0 ? "True" : "False"}
          </p>
          <p>
            <span>No.of products available</span> : {product.count}
          </p>
          <p>
            <span>Cost</span> : {product.cost} Rs/-
          </p>
          <p className="font-bold">
            <span>Description</span>
          </p>
          <p>{product.description}</p>
        </div>

        <div>
          <Button
            className={"add-to-cart"}
            functionOnClick={addToCart}
            content={"Add to Cart"}
          />
        </div>
      </div>
    </div>
  );
};
