import AsyncStorage from '@react-native-async-storage/async-storage'
import { getUserProfile } from '../../apis/auth'


export const handleGetUserProfile = async () => {
    const token = await AsyncStorage.getItem("token")
    const response = await getUserProfile({token})
    console.log(response)
}