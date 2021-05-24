import { createSlice } from "@reduxjs/toolkit"


const styleSlicer = createSlice({
    name: 'style',
    initialState: {
        styles: [],
        selectedStyleID: 'ORIGINAL'
    },
    reducers: {
        setStyles: (state, action) => {
            const data = action.payload
            state.styles = data
        },

        setSelectedStyleID: (state, action) => {
            state.selectedStyleID = action.payload
        }
    }
})


// action export
export const { setStyles, setSelectedStyleID } = styleSlicer.actions


// use-selector export 
export const selectStyles = state => state.style.styles
export const selectSelectedStyleID = state => state.style.selectedStyleID

// reducer export
export default styleSlicer.reducer
