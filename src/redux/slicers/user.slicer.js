import { createSlice } from "@reduxjs/toolkit"
import {USER_REDUCER_PREFIX} from "../../enums/reducer-prefix"


const initialState = {
    profile: {
        firstName: '',
        lastName: '',
        email: '',
        id: ''
    },
    isLoggedIn: false,
}

const userSlicer = createSlice({
    name: USER_REDUCER_PREFIX,
    initialState,
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },

        setUserProfile: (state, action) => {
            state.profile = action.payload
        },

        logOut: (state) => {
            state = initialState
        }
    }
})


// action export
export const { setIsLoggedIn, setUserProfile, logOut } = userSlicer.actions


// use-selector export 
export const selectUserProfile = state => state.user.profile
export const selectUserIsLoggedIn = state => state.user.isLoggedIn
// reducer export
export default userSlicer.reducer
