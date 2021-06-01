import {axios} from 'axios'
import { MAIN_SERVER } from '@env'
export const login= ({username, password}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/auth/login`
    const payload = {username, password}
    const response = await axios.post(ENDPOINT_URL, payload)
    return response.data
}

export const getUserProfile = ({token}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/auth/profile`
    const payload = {username, password}
    const response = await axios.post(ENDPOINT_URL, payload)
    return response.data
}