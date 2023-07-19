import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const address = localStorage.getItem('address');

export const GetCreatedNfts = createAsyncThunk('GetCreatedNfts', async (args, { rejectWithValue }) => {
    const API = "http://localhost:1234/createdNfts";
    const body = {
        address: address
    }
    const response = await fetch(API, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: { "Content-Type": "application/json", 'platform': 'web' }
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