import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./src/Slices/CartSlice";
export default configureStore({
  reducer: {
    cart: CartSlice,
  },
});
