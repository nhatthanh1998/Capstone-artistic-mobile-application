import { createSlice } from "@reduxjs/toolkit"


const isLoadingSlicer = createSlice({
    name: 'isLoading',
    initialState: false,
    reducers: {
        setIsLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})


// action export
export const { setLoading } = isLoadingSlicer.actions


// use-selector export 
export const selectLoading = state => state.isLoading

// reducer export
export default isLoadingSlicer.reducer
