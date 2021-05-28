import { createSlice } from "@reduxjs/toolkit"


const isLoadingSlicer = createSlice({
    name: 'isLoading',
    initialState: false,
    reducers: {
        setIsLoading: (state, action) => {
            console.log(action.payload)
            state = action.payload
            return state
        }
    }
})


// action export
export const { setIsLoading } = isLoadingSlicer.actions


// use-selector export 
export const selectIsLoading = state => state.isLoading

// reducer export
export default isLoadingSlicer.reducer
