import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../../lib/types/order";

interface OrdersPageState {
    orders: Order[];
}

const initialState: OrdersPageState = {
    orders: [],
};

const ordersPageSlice = createSlice({
    name: "ordersPage",
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload;
        },
    },
});

export const { setOrders } = ordersPageSlice.actions;
export default ordersPageSlice.reducer;
