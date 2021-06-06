import AsyncStorage from '@react-native-async-storage/async-storage'
import { getUserProfile } from '../../apis/users'
import {setUserProfile} from '../../redux/slicers/user.slicer'



export const handleGetUserProfile = async ({dispatch}) => {
    const token = await AsyncStorage.getItem("token")
    console.log(token)
    const response = await getUserProfile({token})
    console.log(response.data)
    dispatch(setUserProfile(response.data))
}

export const handlePressMenu = async ({navigation}) => {
    
}
