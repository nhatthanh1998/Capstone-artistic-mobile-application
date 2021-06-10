import { createSlice } from "@reduxjs/toolkit"
import { ALBUM_REDUCER_PREFIX } from "../../enums/reducer-prefix"


const initialState = {
    photos: [],
    selectedPhoto: null,
    metaData: {
        page: 0,
        limit: 10, 
        totalPage: 1
    }
}

const albumSlicer = createSlice({
    name: ALBUM_REDUCER_PREFIX,
    initialState,
    reducers: {
        setAlbumPhotos: (state, action) => {
            let {metaData, photos} = action.payload
            state.metaData = metaData
            state.photos = photos
        },
        addNewPhotoToPhotos: (state, action) => {
            const newPhoto = action.payload
            state.photos = {...state.photos, newPhoto}
        },

        setAlbumSelectedPhoto: (state, action) => {
            state.selectedPhoto = action.payload
        },
        deletePhotoFromAlbums: (state, action) => {
            const {id} = action.payload
            const photos = state.photos.filter(photo => photo.id !== id)
            state.photos = photos
        }

    }
})


// action export
export const { setAlbumPhotos, setAlbumSelectedPhoto, deletePhotoFromAlbums } = albumSlicer.actions


// use-selector export 
export const selectAlbumPhotos = state => state.album.photos
export const selectAlbumSelectedPhoto = state => state.album.selectedPhoto
export const selectAlbumMetadata = state => state.album.metaData

// reducer export
export default albumSlicer.reducer
