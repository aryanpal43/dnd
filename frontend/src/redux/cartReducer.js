import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartFromBackend: (state, action) => {
      state.products = action.payload.products || [];
      state.totalProductsCount = state.products.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);

      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }

      state.totalProductsCount = state.products.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    AddItemCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);

      item.quantity += 1;
    },
    RemoveItemCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);

      item.quantity = item.quantity === 1 ? 1 : item.quantity - 1;
    },
    removeItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
  },
});

export const {
  addToCart,
  removeItem,
  resetCart,
  AddItemCart,
  RemoveItemCart,
  setCartFromBackend,
} = cartSlice.actions;

export default cartSlice.reducer;
