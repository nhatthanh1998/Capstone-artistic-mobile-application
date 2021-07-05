import { createSlice } from "@reduxjs/toolkit"
import { NOTIFICATION_REDUCER_PREFIX } from "../../enums/reducer-prefix"


const initialState = {
    notifications: [],
    count: 0
}

const notificationsSlicer = createSlice({
    name: NOTIFICATION_REDUCER_PREFIX,
    initialState,
    reducers: {
        setNotifications: (state, action) => {
            state.notifications = action.payload.notifications
            state.count = action.payload.count
            return state
        },
        setNumNotification: (state, action) => {
            state.count = action.payload.count
            return state
        }
    }
})


// action export
export const { setNotifications, setNumNotification } = notificationsSlicer.actions


// use-selector export 
export const selectNotifications = state => state.notifications.notifications
export const selectCount = state => state.notifications.count
// reducer export
export default notificationsSlicer.reducer
