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


export async function fetchAlbums({userId, currentPage, limit, offset}) {
    return null
}