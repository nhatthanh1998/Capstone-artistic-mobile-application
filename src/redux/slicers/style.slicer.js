import { createSlice } from "@reduxjs/toolkit"
import {STYLE_REDUCER_PREFIX} from "../../enums/reducer-prefix"
import {DEFAULT_EFFECT_ID} from "../../enums/default-effect-id"


const initialState = {
    styles: [],
    selectedStyleID: DEFAULT_EFFECT_ID
}

const styleSlicer = createSlice({
    name: STYLE_REDUCER_PREFIX,
    initialState,
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
