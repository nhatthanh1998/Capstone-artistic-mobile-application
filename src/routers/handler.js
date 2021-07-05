import AsyncStorage from '@react-native-async-storage/async-storage'
import {setUserProfile, setIsLoggedIn} from '../redux/slicers/user.slicer'
import { getUserProfile } from '../apis/users'
import {UNAUTHORIZED} from '../enums/response-status'
import { LOGIN_PAGE } from '../enums/page-name'


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
    if(response.message && response.statusCode===UNAUTHORIZED) {
        AsyncStorage.removeItem("token")
        navigation.navigate(LOGIN_PAGE)
    } else {
        dispatch(setUserProfile(response))
    }
}

export const handleSocketMessage = (data) => {
    console.log(data)
    const {action} = data
    switch(action) {
        case 'TRANSFER_VIDEO_COMPLETE': {
            console.log("Transfer video complete baby boy!!!")
            break;
        }
    }
}