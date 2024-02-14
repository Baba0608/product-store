import { useState, useEffect } from "react";
import axios from "axios";

import { Header } from "./Header";
import { CartCard } from "./CartCard";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

export const Cart = () => {
  const [cartList, setCartList] = useState([]);

  const deleteFromCart = (productId) => {
    const cartRemaining = cartList.filter(
      (product) => product.product._id != productId
    );

    // console.log(cartRemaining);
    setCartList(cartRemaining);
  };

  const removeNull = (data) => {
    const cartRemaining = data.products.cart.filter(
      (product) => product.product != null
    );

    return cartRemaining;
  };

  const getCartList = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_API}/cart/get-products`, {
        headers: { authorization: localStorage.getItem("store-token") },
      });

      const cartRemaining = removeNull(data);
      setCartList(cartRemaining);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCartList();
  }, []);

  if (!cartList) {
    return;
  }

  return (
    <div>
      <Header />

      <div className="cart-container">
        {cartList.map((product) => {
          return (
            <CartCard
              key={product.product._id}
              resObj={product}
              deleteFromCart={deleteFromCart}
            />
          );
        })}
      </div>
    </div>
  );
};
