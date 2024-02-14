import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { AdminHeader } from "./AdminHeader";
import { Card } from "./Card";
import { Shimmer } from "./Shimmer";
import { Button } from "./Button";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

export const AdminHome = () => {
  const [resList, setResList] = useState([]);
  const [filteredResList, setFilteredResList] = useState([]);
  const [currRes, setCurrRes] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/admin/add-product";
    navigate(path);
  };

  const removeProduct = async (resObj) => {
    const filteredList = resList.filter((res) => res._id != resObj._id);
    setCurrRes(filteredList);
  };

  const fetchResList = async () => {
    const { data } = await axios.get(`${BACKEND_API}/product/all-products`);

    setResList(data.products);
    setFilteredResList(data.products);
  };

  useEffect(() => {
    fetchResList();
  }, [currRes]);

  if (!resList) {
    return <Shimmer />;
  }
  return (
    <div>
      <AdminHeader />

      <div className="add-product-btn-container">
        <Button
          className={"add-product"}
          functionOnClick={routeChange}
          content={"Add Product"}
        />
      </div>

      <div className="search-product-container">
        <input
          type="text"
          name="search-product"
          placeholder="search products..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);

            const filteredList = resList.filter((res) =>
              res.productName
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
            );

            setFilteredResList(filteredList);
          }}
        />
      </div>

      <div className="products-container">
        {filteredResList.map((res) => {
          return (
            <Card
              key={res._id}
              resObj={res}
              isAdmin={true}
              removeProduct={removeProduct}
            />
          );
        })}
      </div>
    </div>
  );
};
