import axios from 'axios'
import {MAIN_SERVER} from '../../config/index'
export const login = async ({email, password}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/auth/login`
    const payload = {username: email, password}
    try {
        const {data} = await axios.post(ENDPOINT_URL, payload, {timeout: 5000})
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

export const loginWithGoogle = async({tokenId}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/users/login-google`
    const payload = {tokenId}
    try {
        const {data} = await axios.post(ENDPOINT_URL, payload, {timeout: 5000})
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