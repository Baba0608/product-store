import axios from "axios";
import { useState, useRef } from "react";

import { AdminHeader } from "./AdminHeader";
import { toastNotifyError, toastNotifySuccess } from "../utils/toast-notify";
import { ButtonLoading } from "./ButtonLoading";
import { Button } from "./Button";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

export const AdminAddProduct = () => {
  const ref = useRef();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState("");
  const [cost, setCost] = useState("");
  const [brand, setBrand] = useState("");
  const [count, setCount] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const uploadFormData = async (e) => {
    e.preventDefault();

    if (
      product != "" &&
      cost != "" &&
      brand != "" &&
      count != "" &&
      description != "" &&
      image != ""
    ) {
      const file = image.files[0];
      let formData = new FormData();
      formData.append("image", file);
      formData.append("product", product);
      formData.append("cost", cost);
      formData.append("brand", brand);
      formData.append("count", count);
      formData.append("description", description);

      setLoading(true);
      const { data } = await axios.post(
        `${BACKEND_API}/product/add-product`,
        formData,
        { headers: { authorization: localStorage.getItem("store-token") } }
      );

      setLoading(false);
      toastNotifySuccess("Product added successfully.");
      setBrand("");
      setCost("");
      setProduct("");
      setCount("");
      setDescription("");
      ref.current.value = "";
    }
  };

  return (
    <div>
      <AdminHeader />

      <div className="add-product-input-container">
        <form>
          <div className="product-name-input">
            <label htmlFor="product-name">Product Name</label> <br />
            <input
              type="text"
              id="product-name"
              value={product}
              name="product-name"
              placeholder="enter product name..."
              onChange={(e) => {
                setProduct(e.target.value);
              }}
            />
          </div>

          <div className="cost-input">
            <label htmlFor="cost">Cost</label> <br />
            <input
              type="text"
              value={cost}
              id="cost"
              name="cost"
              placeholder="enter cost..."
              onChange={(e) => {
                setCost(e.target.value);
              }}
            />
          </div>

          <div className="brand-input">
            <label htmlFor="brand">Brand</label> <br />
            <input
              type="text"
              value={brand}
              id="brand"
              name="brand"
              placeholder="enter brand name..."
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            />
          </div>

          <div className="count-input">
            <label htmlFor="count">No.of Products</label> <br />
            <input
              type="text"
              value={count}
              id="count"
              name="count"
              placeholder="enter no.of products..."
              onChange={(e) => {
                setCount(e.target.value);
              }}
            />
          </div>

          <div className="description-input">
            <label htmlFor="description">Description</label> <br />
            <textarea
              rows={4}
              id="description"
              value={description}
              name="description"
              placeholder="enter description..."
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>

          <div className="image-input">
            <input
              type="file"
              ref={ref}
              name="file-input"
              onChange={(e) => {
                setImage(e.target);
              }}
            />
          </div>

          <div className="btn">
            <Button
              loading={loading}
              className={"add-product-btn"}
              functionOnClick={uploadFormData}
              content={"Add Product"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
