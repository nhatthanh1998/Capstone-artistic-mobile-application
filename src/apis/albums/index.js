import axios from 'axios'
import {MAIN_SERVER} from '@env'
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