import { createSlice } from "@reduxjs/toolkit"
import { GENERATED_IMAGE_REDUCER_PREFIX } from "../../enums/reducer-prefix"


const initialState = {}

const generatedImageSlicer = createSlice({
    name: GENERATED_IMAGE_REDUCER_PREFIX,
    initialState,
    reducers: {
        setGeneratedImage: (state, action) => {
            const { accessURL, styleId, transferPhotoLocation } = action.payload
            state[styleId] = {accessURL, transferPhotoLocation}
        }
    }
})


// action export
export const { setGeneratedImage } = generatedImageSlicer.actions


// use-selector export 
export const selectGeneratedImage= state => state.generatedImage

// reducer export
export default generatedImageSlicer.reducer
