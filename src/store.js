import { configureStore } from "@reduxjs/toolkit";
import allCollection from './Features/Slices/Collections/FetchCollectionSlice'
import nftDetails from './Features/Slices/Nfts/NftDetailsSlice'
import AllNftsSlice from "./Features/Slices/Nfts/AllNftsSlice";
import CreatedNftsSlice from './Features/Slices/Nfts/CreatedNftsSlice';
import CollectedNftsSlice from "./Features/Slices/Nfts/CollectedNftsSlice";
import metamaskConnectSlice from './Features/Slices/Metamask/metamaskSlice'

export const store = configureStore({
    reducer: {
        getAllNfts: AllNftsSlice,
        getAllCollection: allCollection,
        nftDetails: nftDetails,
        createdNfts: CreatedNftsSlice,
        collectedNfts: CollectedNftsSlice,
        metamaskConnect: metamaskConnectSlice
    }
})