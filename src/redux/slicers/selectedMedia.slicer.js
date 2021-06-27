import { createSlice } from "@reduxjs/toolkit"
import { MEDIA_REDUCER_PREFIX } from "../../enums/reducer-prefix"


const initialState = null

const mediaSlicer = createSlice({
    name: MEDIA_REDUCER_PREFIX,
    initialState,
    reducers: {
        setSelectedMedia: (state, action) => {
            state = action.payload
            return state
        },

        cleanMediaState: (state, action) => {
            state = initialState
        }
    }
})


// action export
export const { setSelectedMedia, cleanMediaState } = mediaSlicer.actions

// use-selector export 
export const selectSelectedMedia= state => state.selectedMedia

// reducer export
export default mediaSlicer.reducer
