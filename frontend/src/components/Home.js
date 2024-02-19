import { useState, useEffect } from "react";
import { Header } from "./Header";
import axios from "axios";

import { Shimmer } from "./Shimmer";
import { Card } from "./Card";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

export const Home = () => {
  const [resList, setResList] = useState([]);
  const [filteredResList, setFilteredResList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const fetchResList = async () => {
    const { data } = await axios.get(`${BACKEND_API}/product/all-products`);

    setResList(data.products);
    setFilteredResList(data.products);
  };

  useEffect(() => {
    fetchResList();
  }, []);

  if (!resList) {
    return <Shimmer />;
  }

  return (
    <div className="bg-blue-200 min-h-[100vh]">
      <Header />

      <div className="search-product-container search m-4 mt-20 pt-4 flex justify-center">
        <input
          className="border-2 border-gray-400 rounded-md w-[90%] sm:w-[400px] p-1"
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

      <div className="mx-5 flex flex-wrap justify-center">
        {filteredResList.map((res) => {
          return <Card key={res._id} resObj={res} isAdmin={false} />;
        })}
      </div>
    </div>
  );
};
