import { createSlice } from "@reduxjs/toolkit"
import { ALBUM_REDUCER_PREFIX } from "../../enums/reducer-prefix"


const initialState = {
    photos: [],
    selectedPhoto: null,
    metadata: {
        page: 0,
        limit: 10, 
        totalPage:0
    }
}

const albumSlicer = createSlice({
    name: ALBUM_REDUCER_PREFIX,
    initialState,
    reducers: {
        setAlbumPhotos: (state, action) => {
            const {metadata, photos} = action.payload
            photos = photos.map(photo => {
                photo = {...photo, uri: photo.accessURL}
            })

            state.metadata = metadata
            state.photos = photos
        },
        addNewPhotoToPhotos: (state, action) => {
            const newPhoto = action.payload
            state.photos = {...state.photos, newPhoto}
            return null
        },

        setAlbumSelectedPhoto: (state, action) => {
            state.selectedPhoto = action.payload
            return null
        },

    }
})


// action export
export const { setAlbumPhotos, setAlbumSelectedPhoto } = albumSlicer.actions


// use-selector export 
export const selectAlbumPhotos = state => state.album.photos
export const selectAlbumSelectedPhoto = state => state.album.selectedPhoto
export const selectAlbumMetadata = state => state.album.metadata

// reducer export
export default albumSlicer.reducer
