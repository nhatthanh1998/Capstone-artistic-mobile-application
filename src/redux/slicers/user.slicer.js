import { createSlice } from "@reduxjs/toolkit"
import {USER_REDUCER_PREFIX} from "../../enums/reducer-prefix"


const initialState = {
    profile: null,
    isLoggedIn: false,
}

const userSlicer = createSlice({
    name: USER_REDUCER_PREFIX,
    initialState,
    reducers: {
        setIsLoggedIn: (state, action) => {
            const {isLoggedIn} = action.payload
            state.isLoggedIn = isLoggedIn
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
export const { setIsLoggedIn, setUserInfo, logOut } = userSlicer.actions


// use-selector export 
export const selectUserProfile = state => state.user.profile
export const selectUserIsLoggedIn = state => state.user.isLoggedIn
// reducer export
export default userSlicer.reducer
