import { createSlice } from "@reduxjs/toolkit"


const generatedImageSlicer = createSlice({
    name: 'generatedImage',
    initialState: {
        imageURL: null,
    },
    reducers: {
        setGeneratedImage: (state, action) => {
            const { imageURL } = action.payload
            state.imageURL = imageURL
        }
    }
})


// action export
export const { setGeneratedImage } = generatedImageSlicer.actions


// use-selector export 
export const selectGeneratedImage = state => state.generatedImage

// reducer export
export default generatedImageSlicer.reducer
