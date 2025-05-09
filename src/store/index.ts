import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// Налаштування Redux store з одним ред'юсером cart
export const store = configureStore({
  reducer: { cart: cartReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
