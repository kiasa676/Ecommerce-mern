import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload.attributes || action.payload; // this action.payload is used for for cart item we are passing cart
      const curItem = {
        title: product.title,
        key: product.key,
        image: product.image.data?.attributes.url || product.image,
        price: product.price,
      };
      const index = state.cart.findIndex((item) => {
        return item.key === curItem.key;
      });
      if (index === -1) {
        state.cart.push({ ...curItem, quantity: 1 });
      } else {
        state.cart[index].quantity += 1;
      }
    },
    removeTocart: (state, action) => {
      const curItem = action.payload?.attributes || action.payload;

      const index = state.cart.findIndex((item) => {
        return item.key === curItem.key;
      });
      if (index === -1) {
      } else if (state.cart[index].quantity === 1) {
        state.cart = state.cart.filter((item) => {
          return curItem.key !== item.key;
        });
      } else if (state.cart[index].quantity > 1) {
        state.cart[index].quantity -= 1;
      }
    },
    removeFromCart: (state, action) => {
      const curItem = action.payload;
      state.cart = state.cart.filter((item) => {
        return curItem.key !== item.key;
      });
    },
    resetCart: (state, action) => {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeTocart, removeFromCart, resetCart } =
  cartSlice.actions;
