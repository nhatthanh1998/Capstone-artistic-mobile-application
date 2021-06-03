import { setToken } from '../../redux/slicers/user.slicer'
import { login } from '../../apis/auth'
import { LOGIN_PAGE } from '../../enums/page-name'
export const handleChangeText = ({text, setState}) => {
    setState(text)
}

export const handleRegister = async ({username, password, dispatch, setError, setErrorMessage}) => {
    const response = await login({username, password})
    const { token, error, errorMessage } = response
    if(error == true) {
        setError(true)
        setErrorMessage(errorMessage)
    } else {
        setError(false)
        dispatch(setToken({token}))
    }
}

export const handlePressLoginPage = ({navigation}) => {
    navigation.navigate(LOGIN_PAGE)
}