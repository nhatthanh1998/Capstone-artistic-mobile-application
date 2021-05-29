import { createSlice } from "@reduxjs/toolkit"
import { IS_LOADING_REDUCER_PREFIX } from "../../enums/reducer-prefix"


const initialState = false


const isLoadingSlicer = createSlice({
    name: IS_LOADING_REDUCER_PREFIX,
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
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
