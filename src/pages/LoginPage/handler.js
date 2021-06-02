import { setToken } from '../../redux/slicers/user.slicer'
import { login } from '../../apis/auth'
import { HOME_PAGE, REGISTER_PAGE } from '../../enums/page-name'
export const handleChangeText = ({text, setState}) => {
    setState(text)
}

export const handleLogin = ({username, password, dispatch, navigation, setError}) => {
    const response = await login({username, password})
    const { token, error } = response
    if(error == true) {
        setError(true)
    } else {
        setError(false)
        dispatch(setToken({token}))
        navigation.navigate(HOME_PAGE)
    }
}


export const handleClickRegister = ({navigation}) => {
    navigation.navigate(REGISTER_PAGE)
}