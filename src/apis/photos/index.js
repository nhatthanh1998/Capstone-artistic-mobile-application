import axios from 'axios'
import {MAIN_SERVER} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'


export async function uploadPhotoToServer({imageURI}) {
    const name = new Date().getTime() + ".jpg"
    const ENDPOINT_URL = `${MAIN_SERVER}/medias/upload`
    const socketId = await AsyncStorage.getItem("socketId")
    const token = await AsyncStorage.getItem("token")
    let formData = new FormData();
    formData.append("media", {uri: imageURI, type: 'image/jpg', name});
    formData.append('socketId', socketId)
    const response = await axios.post(ENDPOINT_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}



export async function sendTransferPhotoRequest({photoLocation, selectedStyle }) {
    const ENDPOINT_URL = `${MAIN_SERVER}/medias/transfer-photo`
    const socketId = await AsyncStorage.getItem("socketId")
    const token = await AsyncStorage.getItem("token")
    const payload = {socketId, photoLocation, style: selectedStyle}
    const response = await axios.post(ENDPOINT_URL, payload, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
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

export async function requestSavePhotoToAlbum({photoLocation, albumId}) {
    const token = await AsyncStorage.getItem("token")
    let ENDPOINT_URL = `${MAIN_SERVER}/medias/save-to-album`    
    const payload = {photoLocation, albumId}
    const response = await axios.post(ENDPOINT_URL, payload, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}

export async function requestDeletePhoto({photoId}) {
    const token = await AsyncStorage.getItem("token")
    let ENDPOINT_URL = `${MAIN_SERVER}/medias/${photoId}`    
    const response = await axios.delete(ENDPOINT_URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}
