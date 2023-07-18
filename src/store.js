import { configureStore } from "@reduxjs/toolkit";
import allNfts from './Features/Slices/FetchNftsSlice';

export const store = configureStore({
    reducer: {
        getAllNfts: allNfts
    }
})