import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../lib/types/product";

interface ProductsPageState {
    products: Product[];
    chosenProduct: Product | null;
}

const initialState: ProductsPageState = {
    products: [],
    chosenProduct: null,
};

const productsPageSlice = createSlice({
    name: "productsPage",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
        setChosenProduct: (state, action: PayloadAction<Product | null>) => {
            state.chosenProduct = action.payload;
        },
    },
});

export const { setProducts, setChosenProduct } = productsPageSlice.actions;
export default productsPageSlice.reducer;
