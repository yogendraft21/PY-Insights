import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, User, ShoppingCart, Filter } from "react-feather";
import "./index.css";

import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../store/slice";
import fetchProducts from "./product/model";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const [originalProducts, setOriginalProducts] = useState([]);
  const cartCount = useSelector((state) => state.global.addToCart.count);
  const wishlistCount = useSelector(
    (state) => state.global.addToWishlist.count
  );

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts("all");
        setOriginalProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchAndSetProducts();
  }, []);

  const handleSearchInputChange = (e) => {
    const query = e.target.value.toLowerCase().trim();
    setSearchQuery(query);
    const filtered = originalProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.type.toLowerCase().includes(query)
    );
    dispatch(setProducts(filtered));
  };

  return (
    <nav className="bg-transparent p-4 pl-10 pr-10 flex justify-between items-center navbar">
      <div className="flex items-center space-x-6 w-4/5">
        {" "}
        <Link to="/" className="font-bold text-lg logo">
          GROCERIES
        </Link>
        <div className="relative w-full ml-6">
          {" "}
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="px-4 py-3 rounded-full border border-gray-200 shadow-sm focus:outline-none w-full"
          />
          <Filter className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-5 w-5 h-5 text-gray-600 cursor-pointer" />
        </div>
      </div>
      <div className="flex items-center space-x-6 relative nav-menus">
        {" "}
        <div className="relative">
          <Heart className="w-6 h-6 text-red-500 cursor-pointer" />
          <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full absolute -top-4 -right-4">
            {wishlistCount}
          </span>
        </div>
        <User className="w-6 h-6 text-gray-600 cursor-pointer" />
        <div className="relative">
          <Link to="/checkout">
            <ShoppingCart className="w-6 h-6 text-gray-600 cursor-pointer" />
            <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full absolute -top-4 -right-4">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
