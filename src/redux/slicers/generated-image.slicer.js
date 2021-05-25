import { createSlice } from "@reduxjs/toolkit"


const generatedImageSlicer = createSlice({
    name: 'generatedImage',
    initialState: {},
    reducers: {
        setGeneratedImageAccessURL: (state, action) => {
            const { accessURL, styleID } = action.payload
            state[styleID] = accessURL
        }
    }
})


// action export
export const { setGeneratedImageAccessURL } = generatedImageSlicer.actions


// use-selector export 
export const selectGeneratedImageAccessURL = state => state.generatedImage

// reducer export
export default generatedImageSlicer.reducer
