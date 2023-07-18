import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const GetAllNfts = createAsyncThunk("allNfts", async (args, { rejectWithValue }) => {
    const API = 'http://localhost:1234/getNfts';
    const response = await fetch(API, {
        headers: { 'platform': 'web' }
    })

    try {
        const result = response.json();
        return result
    }
    catch (e) {
        return rejectWithValue(e)
    }
})


export const fetchAllNfts = createSlice({
    name: 'fetchAllNfts',
    initialState: {
        nfts: [],
        loading: false,
        error: null
    },
    extraReducers: {
        [GetAllNfts.pending]: (state) => {
            state.loading = true
        },
        [GetAllNfts.fulfilled]: (state, action) => {
            state.loading = false
            state.nfts = action.payload;
        },
        [GetAllNfts.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export default fetchAllNfts.reducer;