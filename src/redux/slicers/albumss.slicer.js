import { createSlice } from "@reduxjs/toolkit"
import { ALBUM_REDUCER_PREFIX } from "../../enums/reducer-prefix"
import _ from 'lodash'

const initialState = {}

const albumssSlicer = createSlice({
    name: ALBUM_REDUCER_PREFIX,
    initialState,
    reducers: {
        updateAlbumThumbnail: (albums, action) => {
            const {id, thumbnailURL} = action.payload
            albums[id] = {
                ...albums[id],
                thumbnailURL
            }
            return albums
        },
        initAlbums: (_, action) => {
            const albums = {}
            for (album of action.payload) {
                albums[album.id] = {
                    ...album,
                    medias: null
                }
            }
            return albums
        },
        handleAddAlbumRedux: (albums, action) => {
            const newAlbum = action.payload.newAlbum
            return {
                [newAlbum.id]: newAlbum,
                ...albums
            }
        },
        handleDeleteAlbumRedux: (albums, action) => {
            const removeAlbumId = action.payload.albumId
            return _.omit(albums, [removeAlbumId])
        },
        setAlbumMedias: (albums, action) => {
            const {id, medias} = action.payload
            albums[id] = {
                ...albums[id],
                medias
            }
            return albums
        },
        setMediasNull: (albums, action) => {
            const {id} = action.payload
            if(albums[id]) {
                albums[id].medias = null
            }
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
        addMedia: (state, action) => {
            const {albumId, media} = action.payload
            if(state[albumId]) {
                if(state[albumId].medias) {
                    const total = +state[albumId].total + 1
                    const medias = [media, ...state[albumId].medias,]
                    return {
                        ...state,
                        [albumId]: {
                            ...state[albumId],
                            total,
                            medias
                        }
                    }
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


export const { initAlbums, handleAddAlbumRedux, handleDeleteAlbumRedux, 
    setAlbumMedias, moveMediaToOtherAlbum, deleteMedia, addMedia, setMediasNull, updateAlbumThumbnail } = albumssSlicer.actions

export const selectAlbums = state => state.albums

export default albumssSlicer.reducer
