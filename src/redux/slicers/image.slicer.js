import { createSlice } from "@reduxjs/toolkit"


const imageSlicer = createSlice({
    name: 'image',
    initialState: {
        photoLocation: null,
        accessURL: null,
        userID: null,
        photoName: null,
        id: null,
        createdAt: null,
        updatedAt: null
    },
    reducers: {
        setSelectedImage: (state, action) => {
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
export const { setSelectedImage } = imageSlicer.actions


// use-selector export 
export const selectSelectedImage = (state) => state.image

// reducer export
export default imageSlicer.reducer
