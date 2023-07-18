import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const address = localStorage.getItem('address');
export const GetAllNfts = createAsyncThunk("GetAllNfts", async (args, { rejectWithValue }) => {
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
        },
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
        },
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