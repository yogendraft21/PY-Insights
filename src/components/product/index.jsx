import React, { useEffect } from "react";
import { ShoppingCart, Heart } from "react-feather";
import "../index.css";
import fetchProducts from "./model";
import {
  setProducts,
  addToCart,
  addToWishlist,
  removeFromCart,
} from "../../store/slice";
import { useDispatch, useSelector } from "react-redux";

const ProductView = () => {
    const products = useSelector((state) => state.global.products);
    const items = useSelector((state) => state.global.addToCart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts("all");
        dispatch(setProducts(fetchedProducts));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchAndSetProducts();
  }, [dispatch]);

 const handleAddToCart = (product) => {
   const isProductInCart = items.some((item) => item.id === product.id);

   if (!isProductInCart) {
     dispatch(addToCart(product));
   } else {
     alert("Product is already in the cart");
   }
 };


  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  return (
    <div className="bg-transparent p-4 pl-10 pr-10 product-details">
      <h2 className="text-2xl font-semibold mb-4">Trending Items</h2>
      <div className="grid grid-cols-2 gap-4">
        {products.length > 0 &&
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-6 flex items-center list-items"
              style={{ height: "250px" }}
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-1/2 h-full rounded-lg mr-4"
              />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold mb-2">
                  {product.name.slice(0, 12)}
                  {product.name.length > 12 ? "..." : ""}
                </h2>
                <p className="text-sm text-gray-600 mb-14 overflow-hidden whitespace-normal product-des">
                  {product.description.split(" ").slice(0, 10).join(" ")}
                  {product.description.split(" ").length > 10 ? "..." : ""}
                </p>
                {product.available > 10 ? (
                  <span className="rounded-full bg-green-500 text-white text-sm px-3 py-1 mb-2">
                    Available
                  </span>
                ) : (
                  <span className="rounded-full bg-orange-500 text-white text-sm px-3 py-1 mb-2">
                    Only {product.available} Left
                  </span>
                )}
                <div className="flex items-center justify-between mt-5 available">
                  <p className="text-lg font-semibold">{product.price}</p>
                  <div className="flex items-center space-x-5">
                    <ShoppingCart
                      className="w-6 h-6 text-gray-600 cursor-pointer"
                      onClick={() => handleAddToCart(product)}
                    />
                    <Heart
                      className="w-6 h-6 text-gray-600 cursor-pointer"
                      onClick={() => handleAddToWishlist(product)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductView;
