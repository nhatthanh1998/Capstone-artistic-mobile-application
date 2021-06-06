import axios from 'axios'
import {MAIN_SERVER} from '@env'


export const getUserProfile = async ({token}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/users/profile`
    const response = await axios.get(ENDPOINT_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const registerAccount = async ({username, password}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/users`
    const payload = {username, password, email, name}
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
