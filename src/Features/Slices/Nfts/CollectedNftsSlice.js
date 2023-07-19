import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authHeader from "../../Auth/auth.header";

export const getCollectedNfts = createAsyncThunk('getCollectedNfts', async (args, { rejectWithValue }) => {

    try {
        console.log();
        const API = 'https://preprodheftyartapi.thetrustpay.com/collectedNfts';
        const response = await fetch(API, {
            headers: {
                platform: 'web',
                'content-type': 'application/json',
                token: authHeader()
            },
        })

        const data = response.json()

        return data;
    }
    catch (e) {
        rejectWithValue(e)
    }
})

export const CollectedNftsSlice = createSlice({
    name: 'CollectedNftsSlice',
    initialState: {
        nfts: [],
        loading: false,
        error: null
    },
    extraReducers: {
        [getCollectedNfts.pending]: (state) => {
            state.loading = true;
        },
        [getCollectedNfts.fulfilled]: (state, action) => {
            state.loading = false;
            state.nfts = action.payload;
        },
        [getCollectedNfts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export default CollectedNftsSlice.reducer;