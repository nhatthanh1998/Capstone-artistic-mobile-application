import axios from 'axios'
import {MAIN_SERVER} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

export async function requestGetNotifications() {
    const ENDPOINT_URL = `${MAIN_SERVER}/notifications`
    const token = await AsyncStorage.getItem("token")
    const response = await axios.get(ENDPOINT_URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}

export async function requestMarkAllReadNotifications() {
    const ENDPOINT_URL = `${MAIN_SERVER}/notifications/all-read`
    const token = await AsyncStorage.getItem("token")
    const response = await axios.get(ENDPOINT_URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}