import axios from 'axios'
import {MAIN_SERVER} from '../../config/index'
export const login = async ({email, password}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/auth/login`
    const payload = {username: email, password}
    try {
        const {data} = await axios.post(ENDPOINT_URL, payload, {timeout: 2000})
        return {
            token: data.token
        }
    } catch (error) {
        if(error.response) {
            return error.response.data
        }
        else if(error.request) {
            return {
                statusCode: 666,
                message: 'Network Error'
            }
        }
    }
}
