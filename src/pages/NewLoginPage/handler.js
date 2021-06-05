import { login } from '../../apis/auth'
import { REGISTER_PAGE } from '../../enums/page-name'
import { setIsLoggedIn } from '../../redux/slicers/user.slicer'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const handleChangeText = ({text, setState}) => {
    setState(text)
}

export const handleLogin = async ({username, password, dispatch, setError}) => {
    const response = await login({username, password})
    const { token, error } = response
    if(error == true) {
        setError(true)
    } else {
        setError(false)
        AsyncStorage.setItem('token', token)
        dispatch(setIsLoggedIn(true))
        
    }
}


export const handleClickRegister = ({navigation}) => {
    navigation.navigate(REGISTER_PAGE)
}
