import { createSlice } from "@reduxjs/toolkit";
import { OrdersPageState } from "../../../lib/types/screen";

const initialState: OrdersPageState = {
    pausedOrders: [],
    processOrders: [],
    finishedOrders: [],
};

const ordersPageSlice = createSlice({
    name: "ordersPage",
    initialState,
    reducers: {
        setPausedOrders: (state, action) =>
        {
            state.pausedOrders = action.payload;
        },
        setProcessOrders: (state, action) =>
        {
            state.processOrders = action.payload;
        },
        setFinishedOrderss: (state, action) =>
        {
            state.finishedOrders = action.payload;
        },
    },
});

export const { setPausedOrders, setProcessOrders, setFinishedOrderss } = ordersPageSlice.actions;

const OrdersPageReducer = ordersPageSlice.reducer;
export default OrdersPageReducer;