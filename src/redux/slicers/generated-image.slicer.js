import { createSlice } from "@reduxjs/toolkit"
import { GENERATED_IMAGE_REDUCER_PREFIX } from "../../enums/reducer-prefix"


const initialState = {
    accessURL: {},
    photoLocations: {}
}

const generatedImageSlicer = createSlice({
    name: GENERATED_IMAGE_REDUCER_PREFIX,
    initialState,
    reducers: {
        setGeneratedImage: (state, action) => {
            const { accessURL, styleId, transferPhotoLocation } = action.payload
            state.accessURL[styleId] = accessURL
            state.photoLocations[styleId] = transferPhotoLocation
        },

        cleanGeneratedImage: (state, action) => {
            console.log("HERE clean")
            state = initialState
            console.log(state)
            return state
        }
    }
})


// action export
export const { setGeneratedImage, cleanGeneratedImage } = generatedImageSlicer.actions


// use-selector export 
export const selectGeneratedImageAccessURL= state => state.generatedImage.accessURL

export const selectGeneratedImagePhotoLocations = state => state.generatedImage.photoLocations

// reducer export
export default generatedImageSlicer.reducer
