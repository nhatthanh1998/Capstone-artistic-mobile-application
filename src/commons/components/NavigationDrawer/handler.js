import AsyncStorage from '@react-native-async-storage/async-storage'
import { setIsLoggedIn } from '../../../redux/slicers/user.slicer'


export const handleSignOut = async ({dispatch}) => {
    await AsyncStorage.removeItem('token')
    dispatch(setIsLoggedIn(false))
}

export const handleNavigation = ({navigation, pageName}) => {
    navigation.navigate(pageName)
}