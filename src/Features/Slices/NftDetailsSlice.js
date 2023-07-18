const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getNftDetails = createAsyncThunk('getNftDetails', async (nft_id, { rejectWithValue }) => {
    try {
        // console.log('asdfasdf');
        const API = `http://localhost:1234/nftDetail?nft_id=${nft_id}`

        console.log('api', API,);
        const response = await fetch(API, {
            method: 'GET',
            headers: { "Content-Type": "application/json", 'platform': 'web' }
        });

        const data = await response.json()

        console.log('data asdfasdf', data);
        return data
    }
    catch (e) {
        rejectWithValue(e)
    }
})


export const nftDetailsSlice = createSlice({
    name: 'nftDetailsSlice',
    initialState: {
        item: {},
        error: null,
        loading: false
    },
    extraReducers: {
        [getNftDetails.pending]: (state) => {
            state.loading = true
        },
        [getNftDetails.fulfilled]: (state, action) => {
            state.loading = false
            state.item = action.payload
        },
        [getNftDetails.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export default nftDetailsSlice.reducer;