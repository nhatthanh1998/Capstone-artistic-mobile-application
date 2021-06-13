import axios from 'axios'
import { MAIN_SERVER } from '@env'
export const login = async ({username, password}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/auth/login`
    const payload = {username, password}

    const response = await axios.post(ENDPOINT_URL, payload)
    return response.data
}
