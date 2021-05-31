import axios from 'axios'
import {MAIN_SERVER} from '@env'

export async function uploadPhotoToServer({imageURI, socketId}) {
    const ENDPOINT_URL = `${MAIN_SERVER}/photos/upload`
    let formData = new FormData();
    formData.append("photo", {uri: imageURI, type: 'image/jpg', name: 'picture.jpg'});
    formData.append('socketId', socketId)
    const response = await axios.post(ENDPOINT_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}


export async function sendTransferPhotoRequest({socketId, photoLocation, style }) {
    const ENDPOINT_URL = `${MAIN_SERVER}/photos/transfer-photo`
    const payload = {socketId, photoLocation, style}
    const response = await axios.post(ENDPOINT_URL, payload)
    return response.data
}


export async function fetchAlbumPhotos({userId, page, limit, offset}) {
    let ENDPOINT_URL = `${MAIN_SERVER}/photos?`
    userId ? ENDPOINT_URL += `userId=${userId}&` : ENDPOINT_URL
    page ? ENDPOINT_URL += `page=${page}` : ENDPOINT_URL
    limit ? ENDPOINT_URL += `limit=${limit}` : ENDPOINT_URL
    offset ? ENDPOINT_URL += `offset=${offset}` : ENDPOINT_URL
    const response = await axios.get(ENDPOINT_URL)
    return response.data
}
