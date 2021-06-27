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
        removeMediaFromAlbum: (state, action) => {
            const {albumId, mediaId, newAlbumId} = action.payload
            const oldAlbumTotal = +state[albumId].total - 1
            const newAlbumTotal = +state[newAlbumId].total + 1
            const oldMedias = state[albumId].medias.filter(media => media.id != mediaId)
            return {
                ...state,
                [albumId]: {
                    ...state[albumId],
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


export const { initAlbums, setAlbumMedias, removeMediaFromAlbum } = albumssSlicer.actions

export const selectAlbums = state => state.albums

export default albumssSlicer.reducer
