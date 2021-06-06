import AsyncStorage from '@react-native-async-storage/async-storage'
import { getUserProfile } from '../../apis/auth'
import {setUserProfile} from '../../redux/slicers/user.slicer'



export const handleGetUserProfile = async ({dispatch}) => {
    const token = await AsyncStorage.getItem("token")
    const response = await getUserProfile({token})
    dispatch(setUserProfile(response))
}


export const handlePressMenu = async () => {
    
}