import { createSlice } from "@reduxjs/toolkit"
import { ALBUM_REDUCER_PREFIX } from "../../enums/reducer-prefix"


const initialState = {
    photos: [],
    selectedPhoto: null,
    metaData: {
        page: 0,
        limit: 10,
        totalPage: 1
    },
    selectedAlbum: null
}

const albumSlicer = createSlice({
    name: ALBUM_REDUCER_PREFIX,
    initialState,
    reducers: {
        setSelectedAlbum: (state, action) => {
            state.selectedAlbum = action.payload
        },

        setAlbumPhotos: (state, action) => {
            state.photos = action.payload
        },

        addNewPhotoToPhotos: (state, action) => {
            const newPhoto = action.payload
            state.photos = { ...state.photos, newPhoto }
        },

        setAlbumSelectedPhoto: (state, action) => {
            state.selectedPhoto = action.payload
        },
        deletePhotoFromAlbums: (state, action) => {
            const { id } = action.payload
            const photos = state.photos.filter(photo => photo.id !== id)
            state.photos = photos
        }

    }
})


// action export
export const { setAlbumPhotos, setAlbumSelectedPhoto, deletePhotoFromAlbums, setSelectedAlbum } = albumSlicer.actions


// use-selector export 
export const selectAlbumPhotos = state => state.album.photos
export const selectAlbumSelectedPhoto = state => state.album.selectedPhoto
export const selectAlbumMetadata = state => state.album.metaData
export const selectSelectedAlbum = state => state.album.selectedAlbum
// reducer export
export default albumSlicer.reducer
