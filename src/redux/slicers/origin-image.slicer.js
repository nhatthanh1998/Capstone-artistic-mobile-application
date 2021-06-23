import { createSlice } from "@reduxjs/toolkit"
import {ORIGIN_IMAGE_REDUCER_PREFIX} from "../../enums/reducer-prefix"


const initialState = {
    photoLocation: null,
    accessURL: null,
    userID: null,
    name: null,
    id: null,
    createdAt: null,
    updatedAt: null
}

const originImageSlicer = createSlice({
    name: ORIGIN_IMAGE_REDUCER_PREFIX,
    initialState,
    reducers: {
        setOriginImage: (state, action) => {
            const { photoLocation, accessURL, userID, name, id, createdAt, updatedAt} = action.payload
            state.photoLocation = photoLocation
            state.accessURL = accessURL
            state.userID = userID
            state.name = name
            state.id = id
            state.createdAt = createdAt
            state.updatedAt = updatedAt
        },
        cleanOriginImage: (state, action) => {
            state = initialState
        }
    }
})


// action export
export const { setOriginImage, cleanOriginImage } = originImageSlicer.actions


// use-selector export 
export const selectOriginImage = state => state.originImage


// reducer export
export default originImageSlicer.reducer
