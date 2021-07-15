import axios from "axios"
import {MAIN_SERVER} from '../../config/index'

export const getShowCaseByStyleId = async ({styleId}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/showcases?styleId=${styleId}`
    try {
        const { data } = await axios.get(ENDPOINT_URL)
        return { data }
    } catch (error) {
        if(error.response) {
            return error.response.data
        }
        else if (error.request) {
            return {
                statusCode: 666,
                message: 'Network Error!'
            }
        }
    }
}

export const getShowCaseAvailableStyles = async () => {
    const ENDPOINT_URL = `${MAIN_SERVER}/showcases/available-styles`
    try {
        const { data } = await axios.get(ENDPOINT_URL)
        return { data }
    } catch (error) {
        if(error.response) {
            return error.response.data
        }
        else if(error.request) {
            return {
                statusCode: 666,
                message: 'Network Error!'
            }
        }
    }
}