import axios from 'axios'
import {MAIN_SERVER} from '../../config/index'
export const login = async ({email, password}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/auth/login`
    const payload = {username: email, password}
    const response = await axios.post(ENDPOINT_URL, payload)
    return response.data
}
