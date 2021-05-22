import { createSlice } from "@reduxjs/toolkit"


const styleSlicer = createSlice({
    name: 'style',
    initialState: {
        styles: [],
        selectedStyle: null
    },
    reducers: {
        setStyles: (state, action) => {
            const data = action.payload
            state.styles = data
        },

        setSelectedStyle: (state, action) => {
            const data = action.payload
            state.selectedStyle = data
        }
    }
})


// action export
export const { setStyles, setSelectedStyle } = styleSlicer.actions


// use-selector export 
export const selectStyles = state => state.style.styles
export const selectSelectedStyle = state => state.style.selectedStyle

// reducer export
export default styleSlicer.reducer
