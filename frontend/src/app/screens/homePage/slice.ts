import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../lib/types/product";
import { Member } from "../../../lib/types/member";

interface HomePageState {
    bestProducts: Product[];
    newProducts: Product[];
    topUsers: Member[];
}

const initialState: HomePageState = {
    bestProducts: [],
    newProducts: [],
    topUsers: [],
};

const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setBestProducts: (state, action: PayloadAction<Product[]>) => {
            state.bestProducts = action.payload;
        },
        setNewProducts: (state, action: PayloadAction<Product[]>) => {
            state.newProducts = action.payload;
        },
        setTopUsers: (state, action: PayloadAction<Member[]>) => {
            state.topUsers = action.payload;
        },
    },
});

export const { setBestProducts, setNewProducts, setTopUsers } = homePageSlice.actions;
export default homePageSlice.reducer;
