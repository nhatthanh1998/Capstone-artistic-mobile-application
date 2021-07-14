import AsyncStorage from '@react-native-async-storage/async-storage'
import { setUserProfile, setIsLoggedIn } from '../redux/slicers/user.slicer'
import { getUserProfile } from '../apis/users'
import { UNAUTHORIZED } from '../enums/response-status'
import { requestGetNotifications } from '../apis/notifications'
import { setNotifications } from '../redux/slicers/notifications.slicer'
import { setIsLoading } from '../redux/slicers/is-loading.slicer'

export const checkIsLoggedIn = async ({ dispatch }) => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
        try {
            const {data, statusCode, message } = await getUserProfile()
            if (message && statusCode === UNAUTHORIZED) {
                await AsyncStorage.removeItem("token")
                dispatch(setIsLoggedIn(false))
            }
            else {
                dispatch(setIsLoggedIn(true))
                dispatch(setUserProfile(data))
            }
        } catch (error) {
            console.log("error:", error)
        }
       
    } else {
        console.log("HERE 3")
    }
}


export const handleGetUserProfile = async ({ dispatch, navigation }) => {
    const {data, statusCode, message} = await getUserProfile()
    if (message && statusCode === UNAUTHORIZED) {
        await AsyncStorage.removeItem("token")
        dispatch(setIsLoggedIn(false))
    }
    else {
        dispatch(setUserProfile(data))
    }
}