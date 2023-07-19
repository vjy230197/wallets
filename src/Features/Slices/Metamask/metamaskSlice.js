const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const connectMetamask = createAsyncThunk('connectMetamask', async (body, { rejectWithValue }) => {
    try {
        const API = "https://preprodheftyartapi.thetrustpay.com/loginWithMetaMask"
        const response = await fetch(API, {
            body: JSON.stringify(body),
            method: 'POST',
            headers: { "Content-Type": "application/json", 'platform': 'web' }
        });
        if (response.status === 200)
            return response.headers.get('token');
    } catch (error) {
        return rejectWithValue(error)
    }
}
)

const metamaskConnectSlice = createSlice({
    name: 'metamaskConnectSlice',
    initialState: {
        loading: false,
        token: localStorage.getItem('token') || null,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [connectMetamask.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [connectMetamask.fulfilled]: (state, action) => {
            state.token = action.payload
            state.loading = false
            localStorage.setItem('token', action.payload)
        },
        [connectMetamask.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
    },
})

export default metamaskConnectSlice.reducer
