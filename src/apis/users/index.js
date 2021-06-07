import axios from 'axios'
import {MAIN_SERVER} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getUserProfile = async () => {
    const ENDPOINT_URL = `${MAIN_SERVER}/users/profile`
    const token = await AsyncStorage.getItem("token")
    const response = await axios.get(ENDPOINT_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const registerAccount = async ({username, password}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/users`
    const payload = {username, password}
    try {
        const response = await axios.post(ENDPOINT_URL, payload)
        return response.data
    } catch (error) {
        return error.response.data
    }

}

export const uploadProfile = async ({firstName, lastName, dateOfBirth}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/users/profile`
    const payload = {firstName, lastName, dateOfBirth}
    const token = await AsyncStorage.getItem("token")
    const response = await axios.put(ENDPOINT_URL, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}