import axios from 'axios'
import { MAIN_SERVER } from '@env'
export const login = async ({username, password}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/auth/login`
    const payload = {username, password}

    const response = await axios.post(ENDPOINT_URL, payload)
    const data = response.data
    if(data.statusCode === 401) {
        return {
            token: null,
            error: true
        }
    } else {
        return {
            token: data.token,
            error: false
        }
    }
}

export const getUserProfile = async ({token}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/auth/profile`
    const payload = {username, password}
    const response = await axios.post(ENDPOINT_URL, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const registerAccount = async ({username, password}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/users`
    const payload = {username, password}

    const response = await axios.post(ENDPOINT_URL, payload)
    const data = response.data
    if(data.error.length > 0) {
        return {
            token: null,
            error: true,
            errorMessage: error.message
        }
    } else {
        return {
            token: data.token,
            error: false
        }
    }
}