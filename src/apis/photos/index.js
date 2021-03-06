import axios from 'axios'
import { MAIN_SERVER } from '../../config/index'
import AsyncStorage from '@react-native-async-storage/async-storage'


export async function uploadPhotoToServer({ imageURI }) {
    const name = new Date().getTime() + ".jpg"
    const ENDPOINT_URL = `${MAIN_SERVER}/medias/upload`
    const token = await AsyncStorage.getItem("token")
    let formData = new FormData();
    formData.append("media", { uri: imageURI, type: 'image/jpg', name });
    const response = await axios.post(ENDPOINT_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}


export async function sendTransferPhotoRequest({ photoLocation, selectedStyle }) {
    const ENDPOINT_URL = `${MAIN_SERVER}/medias/transfer-photo`
    const token = await AsyncStorage.getItem("token")
    const payload = { photoLocation, styleId: selectedStyle.id }
    try {
        const { data } = await axios.post(ENDPOINT_URL, payload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return { data }
    } catch (error) {
        return error.response.data
    }
}


export async function fetchAlbumMedias() {
    let ENDPOINT_URL = `${MAIN_SERVER}/medias`
    const token = await AsyncStorage.getItem("token")

    const response = await axios.get(ENDPOINT_URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}

export async function requestSavePhotoToAlbum({ photoLocation, albumId }) {
    const token = await AsyncStorage.getItem("token")
    let ENDPOINT_URL = `${MAIN_SERVER}/medias/save-to-album`
    const payload = { photoLocation, albumId }
    const response = await axios.post(ENDPOINT_URL, payload, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}

export async function requestDeleteMedia({ mediaId }) {
    const token = await AsyncStorage.getItem("token")
    let ENDPOINT_URL = `${MAIN_SERVER}/medias/${mediaId}`
    const response = await axios.delete(ENDPOINT_URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}


export async function uploadMedia({ uri, albumId }) {
    const extension = uri.slice(uri.lastIndexOf('.') + 1)
    const name = new Date().getTime() + "." + extension
    let ENDPOINT_URL = `${MAIN_SERVER}/medias/upload`
    const token = await AsyncStorage.getItem("token")
    let formData = new FormData();
    formData.append("albumId", albumId)
    if (extension == 'mp4') {
        ENDPOINT_URL = `${MAIN_SERVER}/videos/upload`
        formData.append("media", { uri, type: 'video/mp4', name });
    } else {
        formData.append("media", { uri, type: 'image/jpeg', name });
    }
    return axios.post(ENDPOINT_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    })
}