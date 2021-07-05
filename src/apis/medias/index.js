import axios from 'axios'
import {MAIN_SERVER} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const changeMediaAlbumLocation = async ({mediaId, selectedAlbumId}) => {
    let ENDPOINT_URL = `${MAIN_SERVER}/medias/${mediaId}`
    const token = await AsyncStorage.getItem("token")
    const data = {
        albumId: selectedAlbumId
    }
    const response = await axios.put(ENDPOINT_URL, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}


export const requestTransferVideo = async({albumId, mediaId, styleId}) => {
    let ENDPOINT_URL = `${MAIN_SERVER}/medias/transfer-video`
    const token = await AsyncStorage.getItem("token")
    const payload = {
        albumId,
        mediaId,
        styleId
    }
    const { data } = await axios.post(ENDPOINT_URL, payload, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}