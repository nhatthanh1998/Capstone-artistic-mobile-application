import axios from "axios"
import {CONFIG} from "../config"
export const fetchAllStyles = async () => {
    const ENDPOINT_URL = `${CONFIG.ENPOINT_URL}/styles`
    const response = await axios.get(ENDPOINT_URL)
    return response.data
}