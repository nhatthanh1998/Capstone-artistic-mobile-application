import { createSlice } from "@reduxjs/toolkit"
import { ALBUM_REDUCER_PREFIX } from "../../enums/reducer-prefix"


const initialState = {
    photos: [],
    selectedPhoto: null
}

const albumSlicer = createSlice({
    name: ALBUM_REDUCER_PREFIX,
    initialState,
    reducers: {
        setAlbumPhotos: (state, action) => {
            state.photos = action.payload
        },

        setAlbumSelectedPhoto: (state, action) => {
            state.selectedPhoto = action.payload
        }
    }
})


// action export
export const { setAlbumPhotos, setAlbumSelectedPhoto } = albumSlicer.actions


// use-selector export 
export const selectAlbumPhotos = state => state.album.photos
export const selectAlbumSelectedPhoto = state => state.album.selectedPhoto


// reducer export
export default albumSlicer.reducer
