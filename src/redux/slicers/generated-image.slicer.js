import { createSlice } from "@reduxjs/toolkit"
import { GENERATED_IMAGE_REDUCER_PREFIX } from "../../enums/reducer-prefix"


const initialState = {}

const generatedImageSlicer = createSlice({
    name: GENERATED_IMAGE_REDUCER_PREFIX,
    initialState,
    reducers: {
        setGeneratedImageAccessURL: (state, action) => {
            const { accessURL, styleID } = action.payload
            state[styleID] = accessURL
            return null
        }
    }
})


// action export
export const { setGeneratedImageAccessURL } = generatedImageSlicer.actions


// use-selector export 
export const selectGeneratedImageAccessURL = state => state.generatedImage

// reducer export
export default generatedImageSlicer.reducer
