import axios from 'axios'
import { CONFIG } from '../config'
export async function uploadImageToServer(imageUri) {
    const ENDPOINT_URL = `${CONFIG.ENPOINT_URL}/photos/upload`
    let formData = new FormData();
    formData.append("photo", {uri: imageUri, type: 'image/jpg', name: 'picture.jpg'});
    const response = await axios.post(ENDPOINT_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return response.data
}


export async function sendTransferImageRequest({socketID, photoLocation, styleID }) {
    const ENDPOINT_URL = `${CONFIG.ENPOINT_URL}/photos/transfer-photo`
    const payload = {socketID, photoLocation, styleID}
    const response = await axios.post(ENDPOINT_URL, payload)

    return response.data
}
