import AsyncStorage from '@react-native-async-storage/async-storage'
import { setUserProfile, setIsLoggedIn } from '../redux/slicers/user.slicer'
import { getUserProfile } from '../apis/users'
import { UNAUTHORIZED } from '../enums/response-status'
import { requestGetNotifications } from '../apis/notifications'
import { setNotifications } from '../redux/slicers/notifications.slicer'
import { setIsLoading } from '../redux/slicers/is-loading.slicer'

export const checkIsLoggedIn = async ({ dispatch }) => {
    dispatch(setIsLoading(true))
    const token = await AsyncStorage.getItem('token')
    if (token !== null) {
        const response = await getUserProfile()
        if (response.message && response.statusCode === UNAUTHORIZED) {
            await AsyncStorage.removeItem("token")
            dispatch(setIsLoggedIn(false))
            dispatch(setIsLoading(false))
        }
        else {
            dispatch(setIsLoggedIn(true))
            dispatch(setUserProfile(response))
            dispatch(setIsLoading(false))
        }
        
    } else {
        dispatch(setIsLoggedIn(false))
        dispatch(setIsLoading(false))

    }
}


export const handleGetUserProfile = async ({ dispatch, navigation }) => {
    const response = await getUserProfile()
    if (response.message && response.statusCode === UNAUTHORIZED) {
        await AsyncStorage.removeItem("token")
        dispatch(setIsLoggedIn(false))
    }
    else {
        dispatch(setUserProfile(response))
    }
}