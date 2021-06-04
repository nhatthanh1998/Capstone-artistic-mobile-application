import AsyncStorage from '@react-native-async-storage/async-storage'
import { setIsLoggedIn } from '../redux/slicers/user.slicer'


export const checkIsLoggedIn = async ({dispatch}) => {
    const token = await AsyncStorage.getItem('token') 
    if(token !== null) {
        dispatch(setIsLoggedIn({isLoggedIn: true}))
    } else {
        dispatch(setIsLoggedIn({isLoggedIn: false}))
    }
}