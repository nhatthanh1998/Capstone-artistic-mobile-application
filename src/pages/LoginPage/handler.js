import { setToken } from '../../redux/slicers/user.slicer'
import { login } from '../../apis/auth'
import { HOME_PAGE, REGISTER_PAGE } from '../../enums/page-name'
import { UNAUTHORIZED } from '../../enums/response-status'
export const handleChangeText = ({text, setState}) => {
    setState(text)
}

export const handleLogin = ({username, password, dispatch, navigation, setError}) => {
    const response = await login({username, password})
    const { data, status } = response
    if(status === UNAUTHORIZED) {
        setError(true)
    } else {
        const {token} = data
        dispatch(setToken(token))
        navigation.navigate(HOME_PAGE)
    }
}


export const handleClickRegister = ({navigation}) => {
    navigation.navigate(REGISTER_PAGE)
}