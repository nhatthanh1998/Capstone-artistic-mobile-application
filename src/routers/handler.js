import AsyncStorage from '@react-native-async-storage/async-storage'
import {setUserProfile, setIsLoggedIn} from '../redux/slicers/user.slicer'
import { getUserProfile } from '../apis/users'
import {UNAUTHORIZED} from '../enums/response-status'
import { LOGIN_PAGE } from '../enums/page-name'
import { requestGetNotifications } from '../apis/notifications'
import { setNotifications } from '../redux/slicers/notifications.slicer'

export const checkIsLoggedIn = async ({dispatch}) => {
    const token = await AsyncStorage.getItem('token')
    if(token !== null) {
        dispatch(setIsLoggedIn(true))
    } else {
        dispatch(setIsLoggedIn(false))
    }
}


export const handleGetUserProfile = async ({dispatch, navigation}) => {
    const response = await getUserProfile()
    console.log(response.message)
    console.log(response.statusCode)
    if(response.message && response.statusCode === UNAUTHORIZED) {
        await AsyncStorage.removeItem("token")
        dispatch(setIsLoggedIn(false))
    } 
    else {
        dispatch(setUserProfile(response))
    }
}