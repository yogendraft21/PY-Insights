import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  addToCart: {
    items: [],
    count: 0,
  },
  addToWishlist: {
    items: [],
    count: 0,
  },
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    addToCart(state, action) {
      state.addToCart.items.push(action.payload);
      state.addToCart.count += 1;
    },
    addToWishlist(state, action) {
      state.addToWishlist.items.push(action.payload);
      state.addToWishlist.count += 1;
    },
    removeFromCart(state, action) {
      const index = state.addToCart.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.addToCart.items.splice(index, 1);
        state.addToCart.count -= 1;
      }
    },
  },
});

export const { setProducts, addToCart, addToWishlist, removeFromCart } =
  globalSlice.actions;

export default globalSlice.reducer;
