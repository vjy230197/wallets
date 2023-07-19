import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authHeader from "../../Auth/auth.header";

export const GetCreatedNfts = createAsyncThunk('GetCreatedNfts', async (args, { rejectWithValue }) => {
    const API = "https://preprodheftyartapi.thetrustpay.com/createdNfts";

    const response = await fetch(API, {
        headers: { "Content-Type": "application/json", 'platform': 'web', token: authHeader() }
    });

    try {
        const result = response.json();
        return result
    }
    catch (e) {
        return rejectWithValue(e)
    }
})

export const CreatedNftsSlice = createSlice({
    name: 'CreatedNftsSlice',
    initialState: {
        nfts: [],
        loading: false,
        error: null
    },
    extraReducers: {
        [GetCreatedNfts.pending]: (state) => {
            state.loading = true
        },
        [GetCreatedNfts.fulfilled]: (state, action) => {
            state.loading = false
            state.nfts = action.payload;
        },
        [GetCreatedNfts.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export default CreatedNftsSlice.reducer;