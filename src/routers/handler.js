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
            dispatch(setIsLoading(true))
            const {data, statusCode, message } = await getUserProfile()
            if (message && statusCode === UNAUTHORIZED) {
                await AsyncStorage.removeItem("token")
                dispatch(setIsLoggedIn(false))
            }
            else {
                dispatch(setIsLoggedIn(true))
                dispatch(setUserProfile(data))
            }
            dispatch(setIsLoading(false))
        } catch (error) {
            dispatch(setIsLoading(false))
        }
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