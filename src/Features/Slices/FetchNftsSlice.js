import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const address = localStorage.getItem('address');

export const getCollectedNfts = createAsyncThunk('getCollectedNfts', async (args, { rejectWithValue }) => {

    try {
        const API = 'http://localhost:1234/collectedNfts';
        const body = {
            address: address
        }
        const response = await fetch(API, {
            body: JSON.stringify(body),
            headers: {
                platform: 'web',
                'content-type': 'application/json'
            },
            method: 'POST'
        })

        const data = response.json()

        return data;
    }
    catch (e) {
        rejectWithValue(e)
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

export default fetchAllNfts.reducer;