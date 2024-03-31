import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, setProducts } from "../store/slice";
import "../components/index.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.global.addToCart.items);
  const [showOfferMessageCocaCola, setShowOfferMessageCocaCola] =
    useState(false);
  const [showOfferMessageCroissants, setShowOfferMessageCroissants] =
    useState(false);


  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const [cartItemsWithQuantity, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(cartItems.map((item) => ({ ...item, quantity: 1 })));
  }, [cartItems]);

  useEffect(() => {
    if (cartItemsWithQuantity.length > 0) {
      const subtotal = cartItemsWithQuantity.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^\d.-]/g, ""));
        return total + price * item.quantity;
      }, 0);

      const discount = 0;
      const total = (subtotal - discount).toFixed(2);

      setSubtotal(subtotal.toFixed(2));
      setDiscount(discount.toFixed(2));
      setTotal(total);
    }

  }, [cartItemsWithQuantity]);
    
   useEffect(() => {
     const cocaColaProduct = cartItemsWithQuantity.find(
       (product) => product.id === 642 && product.quantity >= 6
     );
     const croissantsProduct = cartItemsWithQuantity.find(
       (product) => product.id === 532 && product.quantity >= 3
     );

     if (cocaColaProduct) {
       setShowOfferMessageCocaCola(true);
     } else {
       setShowOfferMessageCocaCola(false);
     }

     if (croissantsProduct) {
       setShowOfferMessageCroissants(true);
     } else {
       setShowOfferMessageCroissants(false);
     }
   }, [cartItemsWithQuantity]);


  const handleIncreaseQuantity = (index) => {
    const updatedCartItems = [...cartItemsWithQuantity];
    const product = updatedCartItems[index];

    product.quantity++;
    setCartItems(updatedCartItems);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedCartItems = [...cartItemsWithQuantity];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity--;
      setCartItems(updatedCartItems);
    }
  };

  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  return (
    <div className="p-6 checkout-mobile-padding">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
      {cartItemsWithQuantity.map((product, index) => (
        <div
          key={product.id}
          className="flex items-center justify-between w-full bg-white bg-opacity-50 shadow-md rounded-lg p-4 mb-4 checkout-mobile-layout"
        >
          {/* Image, Name, Offer Message */}
          <div className="flex items-center flex-1 checkout-mobile-item">
            <img
              src={product.img}
              alt={product.name}
              className="w-20 h-20 rounded-lg mr-4"
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              {product.id === 642 &&
                showOfferMessageCocaCola &&
                product.quantity >= 6 && (
                  <p className="text-sm text-gray-600 mb-1">
                    Buy 6 cans of Coca-Cola, and get one free
                  </p>
                )}
              {product.id === 532 &&
                showOfferMessageCroissants &&
                product.quantity >= 3 && (
                  <p className="text-sm text-gray-600 mb-1">
                    Buy 3 croissants and get a free coffee
                  </p>
                )}
            </div>
          </div>
          {/* Quantity */}
          <div className="flex items-center flex-1 justify-center checkout-mobile-item">
            <div className="flex items-center">
              <button
                onClick={() => handleDecreaseQuantity(index)}
                className="text-white bg-orange-500 rounded-full w-6 h-6 flex items-center justify-center border-none"
              >
                -
              </button>
              <span className="px-2 py-1 bg-transparent mx-2">
                {product.quantity}
              </span>
              <button
                onClick={() => handleIncreaseQuantity(index)}
                className="text-white bg-green-500 rounded-full w-6 h-6 flex items-center justify-center border-none"
              >
                +
              </button>
            </div>
          </div>

          {/* Price and Remove Button */}
          <div className="flex items-center flex-1 justify-end checkout-mobile-item-div">
            <p className="text-lg font-thin text-gray-500">{product.price}</p>
            <button
              onClick={() => handleRemoveFromCart(product)}
              className="text-red-500 checkout-mobile-remove-button bg-green-500 rounded-full px-2 py-0"
            >
              <span className="hidden sm:inline text-white">x</span>
              <span className="sm:hidden text-white">Remove Item</span>
            </button>
          </div>
        </div>
      ))}
      {/* Subtotal, Discount, Total, Checkout Button */}
      <hr className="my-6 border-t-2 border-gray-300 w-full h-1" />
      <div className="flex justify-around w-full">
        <p>Subtotal</p>
        <p>${subtotal}</p>
      </div>
      <hr className="my-6 border-t-2 border-gray-300 w-full h-1" />
      <div className="flex justify-around w-full">
        <p>Discount</p>
        <p>${discount}</p>
      </div>
      <hr className="my-6 border-t-2 border-gray-300 w-full h-1" />
      <div className="flex justify-around w-full">
        <p>Total</p>
        <p>${total}</p>
      </div>
      <hr className="my-6 border-t-2 border-gray-300 w-full h-1" />
      <button className="bg-green-500 text-white px-6 py-2 rounded-md mt-6 checkout-btn">
        Checkout
      </button>
    </div>
  );
};

export default Checkout;
