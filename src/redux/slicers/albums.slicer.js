import { createSlice } from "@reduxjs/toolkit"
import { ALBUM_REDUCER_PREFIX } from "../../enums/reducer-prefix"


const initialState = {
    medias: [],
    selectedMedia: null,
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

        setAlbumMedias: (state, action) => {
            state.medias = action.payload
        },

        setAlbumSelectedMedia: (state, action) => {
            state.selectedPhoto = action.payload
        },
        deleteMediaFromAlbums: (state, action) => {
            const { id } = action.payload
            const medias = state.medias.filter(media => media.id !== id)
            state.medias = medias
        }

    }
})


// action export
export const { setAlbumMedias, setAlbumSelectedMedia, deleteMediaFromAlbums, setSelectedAlbum } = albumSlicer.actions


// use-selector export 
export const selectAlbumMedias = state => state.album.medias
export const selectAlbumSelectedMedia = state => state.album.selectedMedia
export const selectAlbumMetadata = state => state.album.metaData
export const selectSelectedAlbum = state => state.album.selectedAlbum
// reducer export
export default albumSlicer.reducer
