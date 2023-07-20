import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetAllNfts = createAsyncThunk("GetAllNfts", async (data, { rejectWithValue }) => {
    console.log('heter', data);
    const API = `https://preprodheftyartapi.thetrustpay.com/getNftsPoc?page=${data.page}&limit=${data.limit}`;
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

export const AllNftsSlice = createSlice({
    name: 'AllNftsSlice',
    initialState: {
        nfts: [],
        loading: false,
        error: null,
        totalCount: 0
    },
    extraReducers: {
        [GetAllNfts.pending]: (state) => {
            state.loading = true
        },
        [GetAllNfts.fulfilled]: (state, action) => {
            state.loading = false
            state.nfts = action.payload.data;
            state.totalCount = action.payload.totalCount
        },
        [GetAllNfts.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export default AllNftsSlice.reducer;