import { configureStore } from "@reduxjs/toolkit";
import allCollection from './Features/Slices/FetchCollectionSlice'
import nftDetails from './Features/Slices/NftDetailsSlice'
import AllNftsSlice from "./Features/Slices/AllNftsSlice";
import CreatedNftsSlice from './Features/Slices/CreatedNftsSlice';
import CollectedNftsSlice from "./Features/Slices/CollectedNftsSlice";

export const store = configureStore({
    reducer: {
        getAllNfts: AllNftsSlice,
        getAllCollection: allCollection,
        nftDetails: nftDetails,
        createdNfts: CreatedNftsSlice,
        collectedNfts: CollectedNftsSlice
    }
})