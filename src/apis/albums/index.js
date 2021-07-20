import axios from 'axios'
import {MAIN_SERVER} from '../../config/index'
import AsyncStorage from '@react-native-async-storage/async-storage'

export async function fetchAlbums() {
    let ENDPOINT_URL = `${MAIN_SERVER}/albums`
    const token = await AsyncStorage.getItem("token")
    const response = await axios.get(ENDPOINT_URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}

export const getAlbumDetail = async ({albumId}) => {
    let ENDPOINT_URL = `${MAIN_SERVER}/albums/${albumId}`
    const token = await AsyncStorage.getItem("token")
    const response = await axios.get(ENDPOINT_URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}

export async function createNewAlbum(albumName) {
    let ENDPOINT_URL = `${MAIN_SERVER}/albums`
    const token = await AsyncStorage.getItem("token")

    const response = await axios.post(ENDPOINT_URL, {name: albumName}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}

export async function deleteAlbum({albumId}) {
    let ENDPOINT_URL = `${MAIN_SERVER}/albums/${albumId}`
    const token = await AsyncStorage.getItem("token")
    const response = await axios.delete(ENDPOINT_URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}

export async function changeAlbumBackground({albumId, photoLocation}) {
    let ENDPOINT_URL = `${MAIN_SERVER}/albums/${albumId}`
    const token = await AsyncStorage.getItem("token")
    const data = {
        thumbnailURL: photoLocation
    }
    const response = await axios.put(ENDPOINT_URL, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}

export async function changeAlbumBackgroundWithUploadFile({albumId, imageURI}) {
    let ENDPOINT_URL = `${MAIN_SERVER}/albums/${albumId}/update-background-with-upload`
    const token = await AsyncStorage.getItem("token")
    let formData = new FormData();
    formData.append("photo", { uri: imageURI, type: 'image/jpg', name: "albumBackground.jpg" });
    formData.append('socketId', socketId)
    const response = await axios.put(ENDPOINT_URL, formData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}