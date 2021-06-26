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
