import axios from "axios"
import {MAIN_SERVER} from "@env"
export const fetchAllStyles = async () => {
    const ENDPOINT_URL = `${MAIN_SERVER}/styles`
    const response = await axios.get(ENDPOINT_URL)
    return response.data
}