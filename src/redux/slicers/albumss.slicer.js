import { createSlice } from "@reduxjs/toolkit"
import { ALBUM_REDUCER_PREFIX } from "../../enums/reducer-prefix"


const initialState = {}

const albumssSlicer = createSlice({
    name: ALBUM_REDUCER_PREFIX,
    initialState,
    reducers: {
        initAlbums: (state, action) => {
            const albums = {}
            for (album of action.payload) {
                albums[album.id] = {
                    ...album,
                    medias: null
                }
            }
            return state = albums
        },
        setAlbumMedias: (state, action) => {
            state = {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    medias: action.payload.medias
                }
            }
            return state
        },
        deleteMedia: (state, action) => {
            const {albumId, mediaId} = action.payload
            const total = +state[albumId].total - 1
            const medias = state[albumId].medias.filter(media => media.id != mediaId)
            return {
                ...state,
                [albumId]: {
                    ...state[albumId],
                    total,
                    medias
                }
            }
        },
        moveMediaToOtherAlbum: (state, action) => {
            const {oldAlbumId, mediaId, newAlbumId} = action.payload
            const oldAlbumTotal = +state[oldAlbumId].total - 1
            const newAlbumTotal = +state[newAlbumId].total + 1
            const oldMedias = state[oldAlbumId].medias.filter(media => media.id != mediaId)
            return {
                ...state,
                [oldAlbumId]: {
                    ...state[oldAlbumId],
                    total: oldAlbumTotal,
                    medias: oldMedias
                },
                [newAlbumId]: {
                    ...state[newAlbumId],
                    total: newAlbumTotal
                }
            }
        }
    }
})


export const { initAlbums, setAlbumMedias, moveMediaToOtherAlbum, deleteMedia} = albumssSlicer.actions

export const selectAlbums = state => state.albums

export default albumssSlicer.reducer
