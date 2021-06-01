import { createSlice } from "@reduxjs/toolkit"
import {USER_REDUCER_PREFIX} from "../../enums/reducer-prefix"


const initialState = {
    profile: null,
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
            state.isLoggedIn = true
        },

        setUserProfile: (state, action) => {
            const {profile} = action.payload
            state.profile = profile
        },

        logOut: (state, action) => {
            state = initialState
        }
    }
})


// action export
export const { setToken, setUserInfo, logOut } = userSlicer.actions


// use-selector export 
export const selectUserProfile = state => state.user.profile
export const selectUserToken = state => state.user.token
export const selectUserIsLoggedIn = state => state.user.isLoggedIn
// reducer export
export default userSlicer.reducer
