import { createSlice } from "@reduxjs/toolkit"
import {USER_REDUCER_PREFIX} from "../../enums/reducer-prefix"


const initialState = {
    info: null,
    isLoggedIn: false,
    token: ''
}

const userSlicer = createSlice({
    name: USER_REDUCER_PREFIX,
    initialState,
    reducers: {
        setToken: (state, action) => {
            const { token } = action.payload
            state.token = token
        },

        setUserInfo: (state, action) => {
            const {info} = action.payload
            state.info = info
        },

        logOut: (state, action) => {
            state = initialState
        }
    }
})


// action export
export const { setToken, setUserInfo, logOut } = userSlicer.actions


// use-selector export 
export const selectUserInfo = state => state.user.info
export const selectUserToken = state => state.user.token
export const selectUserIsLoggedIn = state => state.user.isLoggedIn
user
// reducer export
export default userSlicer.reducer
