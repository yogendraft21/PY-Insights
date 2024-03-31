import React from "react";
import "./index.css"
import { useDispatch } from "react-redux";
import { setProducts } from "../store/slice";
import fetchProducts from "./product/model";

const MenuItems = () => {
  const dispatch = useDispatch();

  const handleCategoryClick = async (category) => {
    try {
      const products = await fetchProducts(category);
      dispatch(setProducts(products));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="bg-transparent p-4 pl-10 pr-10 flex justify-start items-center menu-items">
      <div className="flex items-center space-x-4 menus">
        <div
          className="border border-gray-200 shadow-md rounded-full p-2 cursor-pointer"
          onClick={() => handleCategoryClick("all")}
        >
          <span className="px-6 py-3 items-list">All</span>
        </div>
        <div
          className="border border-gray-200 shadow-md rounded-full p-2 cursor-pointer"
          onClick={() => handleCategoryClick("drinks")}
        >
          <span className="px-6 py-3 items-list">Drink</span>
        </div>
        <div
          className="border border-gray-200 shadow-md rounded-full p-2 cursor-pointer"
          onClick={() => handleCategoryClick("fruit")}
        >
          <span className="px-6 py-3 items-list">Fruits</span>
        </div>
        <div
          className="border border-gray-200 shadow-md rounded-full p-2 cursor-pointer"
          onClick={() => handleCategoryClick("bakery")}
        >
          <span className="px-6 py-3 items-list">Bakery</span>
        </div>
      </div>
    </div>
  );

};

export default MenuItems;
