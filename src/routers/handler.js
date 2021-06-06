import AsyncStorage from '@react-native-async-storage/async-storage'
import {setUserProfile, setIsLoggedIn} from '../redux/slicers/user.slicer'
import { getUserProfile } from '../apis/users'
export const checkIsLoggedIn = async ({dispatch}) => {
    const token = await AsyncStorage.getItem('token')
    if(token !== null) {
        dispatch(setIsLoggedIn(true))
    } else {
        dispatch(setIsLoggedIn(false))
    }
}

export const handleGetUserProfile = async ({dispatch}) => {
    const token = await AsyncStorage.getItem("token")
    const response = await getUserProfile({token})
    dispatch(setUserProfile(response))
}
