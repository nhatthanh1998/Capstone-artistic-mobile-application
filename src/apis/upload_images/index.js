import axios from 'axios'
import {MAIN_SERVER} from '@env'

export async function uploadImageToServer({imageURI, socketID}) {
    const ENDPOINT_URL = `${MAIN_SERVER}/photos/upload`
    let formData = new FormData();
    formData.append("photo", {uri: imageURI, type: 'image/jpg', name: 'picture.jpg'});
    formData.append('socketID', socketID)
    const response = await axios.post(ENDPOINT_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}


export async function sendTransferImageRequest({socketID, photoLocation, styleID }) {
    const ENDPOINT_URL = `${MAIN_SERVER}/photos/transfer-photo`
    const payload = {socketID, photoLocation, styleID}
    const response = await axios.post(ENDPOINT_URL, payload)

    return response.data
}
