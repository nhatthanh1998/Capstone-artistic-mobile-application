import axios from "axios"
import {MAIN_SERVER} from "@env"

export const getShowCaseByStyleId = async ({styleId}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/showcases?styleId=${styleId}`
    const response = await axios.get(ENDPOINT_URL)
    return response.data
}