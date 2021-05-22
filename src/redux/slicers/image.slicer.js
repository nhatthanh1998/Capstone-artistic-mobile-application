import { createSlice } from "@reduxjs/toolkit"


const imageSlicer = createSlice({
    name: 'socket',
    initialState: {
        selectedImage: null
    },
    reducers: {
        setSelectedImage: (state, action) => {
            const data = action.payload
            state.selectedImage = data
        }
    }
})


// action export
export const { setSelectedImage } = imageSlicer.actions


// use-selector export 
export const selectSelectedImage = (state) => state.image.selectedImage

// reducer export
export default imageSlicer.reducer
