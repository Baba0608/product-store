import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { AdminHeader } from "./AdminHeader";
import { Button } from "./Button";
import { toastNotifyError, toastNotifySuccess } from "../utils/toast-notify";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

export const AdminUpdateProduct = () => {
  let navigate = useNavigate();
  const ref = useRef();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState("");
  const [cost, setCost] = useState("");
  const [brand, setBrand] = useState("");
  const [count, setCount] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState("");

  const { productId } = useParams();

  const uploadFormData = async () => {
    const updatedData = {
      productName: product,
      cost: cost,
      count: count,
      description: description,
      brand: brand,
      imageURL: imageURL,
    };
    if (image != "") {
      const file = image.files[0];
      let formData = new FormData();
      formData.append("image", file);
      try {
        setLoading(true);
        const { data } = await axios.post(
          `${BACKEND_API}/product/upload-image`,
          formData,
          { headers: { authorization: localStorage.getItem("store-token") } }
        );

        updatedData.imageURL = data.imageURL;
      } catch (err) {
        setLoading(false);
        toastNotifyError("Something went wrong.");
      }
    }

    try {
      setLoading(true);
      await axios.put(
        `${BACKEND_API}/product/update-details/${productId}`,
        updatedData,
        { headers: { authorization: localStorage.getItem("store-token") } }
      );

      toastNotifySuccess("Product Details updated.");
      navigate("/admin/home");
    } catch (err) {
      console.log(err);
      toastNotifyError("Something went wrong.");
    }

    setLoading(false);
  };

  const fetchProduct = async () => {
    const { data } = await axios.get(`${BACKEND_API}/product/${productId}`);
    const { productName, cost, count, brand, description, imageURL } =
      data.result;
    setBrand(brand);
    setCost(cost);
    setCount(count);
    setDescription(description);
    setProduct(productName);
    setImageURL(imageURL);
  };

  useEffect(() => {
    fetchProduct();
  }, []);
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
              content={"Update Product"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
