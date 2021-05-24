import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    client: null,
    socketID: null
}

const socketSlicer = createSlice({
    name: 'socket',
    initialState: {
        socketID: null
    },
    reducers: {
        setSocket: (state, action) => {
            const {client, socketID} = action.payload
            state.socketID = socketID

        },
        removeSocket: state => {
            state = initialState
        }
    }
})


// action export
export const { setSocket, removeSocket } = socketSlicer.actions


// use-selector export 
export const selectSocketID = state => state.socket.socketID

// reducer export
export default socketSlicer.reducer
