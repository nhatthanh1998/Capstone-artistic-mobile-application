import axios from "axios"
import {MAIN_SERVER} from '../../config/index'

export const fetchAllStyles = async () => {
    const ENDPOINT_URL = `${MAIN_SERVER}/styles`
    const response = await axios.get(ENDPOINT_URL)
    return response.data
}

export const fetchAllVideoSupportedStyles = async () => {
    const ENDPOINT_URL = `${MAIN_SERVER}/styles/video-transfer`
    const response = await axios.get(ENDPOINT_URL)
    return response.data
}