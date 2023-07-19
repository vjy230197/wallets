const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const getCreatedCollections = createAsyncThunk('getCreatedCollections', async (args, { rejectWithValue }) => {
    try {
        const API = 'http://localhost:1234/createdCollections'
        const body = {
            address: localStorage.getItem('address')
        }

        const response = await fetch(API, {
            headers: {
                'platform': 'web',
                'content-type': 'application/json'
            },
            body: JSON.stringify(body),
            method: 'POST'

        })

        const result = await response.json()
        return result;
    }
    catch (e) {
        rejectWithValue(e)
    }
})

export const getCollections = createSlice({
    name: 'getCollections',
    initialState: {
        collections: [],
        loading: false,
        error: null
    },
    extraReducers: {
        [getCreatedCollections.pending]: (state) => {
            state.loading = true
        },
        [getCreatedCollections.fulfilled]: (state, action) => {
            state.loading = false;
            state.collections = action.payload;
        },
        [getCreatedCollections.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload;
        }
    }
})

export default getCollections.reducer;