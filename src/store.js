import { configureStore } from "@reduxjs/toolkit";
import allNfts from './Features/Slices/FetchNftsSlice';
import allCollection from './Features/Slices/FetchCollectionSlice'

export const store = configureStore({
    reducer: {
        getAllNfts: allNfts,
        getAllCollection: allCollection
    }
})