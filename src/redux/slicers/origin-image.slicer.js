import { createSlice } from "@reduxjs/toolkit"
import {ORIGIN_IMAGE_REDUCER_PREFIX} from "../../enums/reducer-prefix"


const initialState = {
    photoLocation: null,
    accessURL: null,
    userID: null,
    photoName: null,
    id: null,
    createdAt: null,
    updatedAt: null
}

const originImageSlicer = createSlice({
    name: ORIGIN_IMAGE_REDUCER_PREFIX,
    initialState,
    reducers: {
        setOriginImage: (state, action) => {
            const { photoLocation, accessURL, userID, photoName, id, createdAt, updatedAt} = action.payload
            state.photoLocation = photoLocation
            state.accessURL = accessURL
            state.userID = userID
            state.photoName = photoName
            state.id = id
            state.createdAt = createdAt
            state.updatedAt = updatedAt
        }
    }
})


// action export
export const { setOriginImage } = originImageSlicer.actions


// use-selector export 
export const selectOriginImage = (state) => state.originImage


// reducer export
export default originImageSlicer.reducer
