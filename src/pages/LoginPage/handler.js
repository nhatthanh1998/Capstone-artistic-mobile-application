import { login } from '../../apis/auth'
import { REGISTER_PAGE } from '../../enums/page-name'
import { setIsLoggedIn } from '../../redux/slicers/user.slicer'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const handleChangeUsername = ({text, setUsername, setUsernameError}) => {
    setUsername(text)
    if(text.length > 0) {
        setUsernameError('')
    }
}

export const handleChangePassword = ({text, setPassword, setPasswordError}) => {
    setPassword(text)
    if(text.length > 0) {
        setPasswordError('')
    }
}

export const handleLogin = async ({ username, password, setUsernameError, setPasswordError, dispatch, setError, setIsLoading }) => {
    let isValidated = true
    if (username.length === 0) {
        setUsernameError("Username is required!")
        isValidated = false
    }
    if (password.length === 0) {
        setPasswordError("Password is required!")
        isValidated = false
    }

    if (isValidated === true) {
        try {
            setIsLoading(true)
            const response = await login({ username, password })
            const { token } = response
            setError(false)
            AsyncStorage.setItem('token', token)
            dispatch(setIsLoggedIn(true))
        } catch (e) {
            setError(true)
        }
    }
}


export const handleClickRegister = ({ navigation }) => {
    navigation.navigate(REGISTER_PAGE)
}
