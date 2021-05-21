import { createSlice } from "@reduxjs/toolkit"


const socketSlicer = createSlice({
    name: 'socket',
    initialState: null,
    reducers: {
        init: (state, action) => {
            const {client} = action.payload
            state = client
        },
        remove: state => {
            state = null
        }
    }
})


// action export
export const { init, remove } = socketSlicer.actions


// use-selector export 
export const selectSocket = (state) => state.socket

// reducer export
export default socketSlicer.reducer
