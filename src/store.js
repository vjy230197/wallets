import { configureStore } from "@reduxjs/toolkit";
import allNfts from './Features/Slices/FetchNftsSlice';
import allCollection from './Features/Slices/FetchCollectionSlice'
import nftDetails from './Features/Slices/NftDetailsSlice'
import AllNftsSlice from "./Features/Slices/AllNftsSlice";
import CreatedNftsSlice from './Features/Slices/CreatedNftsSlice';

export const store = configureStore({
    reducer: {
        getAllNfts: AllNftsSlice,
        getAllCollection: allCollection,
        nftDetails: nftDetails,
        createdNfts: CreatedNftsSlice
    }
})