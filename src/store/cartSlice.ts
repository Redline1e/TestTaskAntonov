import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Ticket = { flightId: string; seat: string; price: number };

interface CartState {
  tickets: Ticket[];
}

const initialState: CartState = {
  tickets: JSON.parse(localStorage.getItem("cart") || "[]"),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.tickets.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.tickets));
    },
    removeTicket: (
      state,
      action: PayloadAction<{ flightId: string; seat: string }>
    ) => {
      state.tickets = state.tickets.filter(
        (t) =>
          !(
            t.flightId === action.payload.flightId &&
            t.seat === action.payload.seat
          )
      );
      localStorage.setItem("cart", JSON.stringify(state.tickets));
    },
    clearCart: (state) => {
      state.tickets = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addTicket, removeTicket, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
