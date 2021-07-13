import { login } from '../../apis/auth'
import { REGISTER_PAGE, RESET_PASSWORD_PAGE } from '../../enums/page-name'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {getUserProfile} from '../../apis/users'
import {setIsLoggedIn, setUserProfile} from '../../redux/slicers/user.slicer'
import {setIsLoading} from '../../redux/slicers/is-loading.slicer'
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

export const handleLogin = async ({ username, password, setUsernameError, setPasswordError, dispatch, setError }) => {
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
            dispatch(setIsLoading(true))
            const response = await login({ username, password })
            const { token } = response
            setError(false)
            AsyncStorage.setItem('token', token)
            dispatch(setIsLoading(false))
            checkIsLoggedIn({dispatch})
        } catch (e) {
            setError(true)
        }
    }
}


export const handleClickRegister = ({ navigation }) => {
    navigation.navigate(REGISTER_PAGE)
}

export const checkIsLoggedIn = async ({ dispatch }) => {
    dispatch(setIsLoading(true))
    const token = await AsyncStorage.getItem('token')
    if (token !== null) {
        const response = await getUserProfile()
        if (response.message && response.statusCode === UNAUTHORIZED) {
            await AsyncStorage.removeItem("token")
            dispatch(setIsLoggedIn(false))
            dispatch(setIsLoading(false))
        }
        else {
            dispatch(setIsLoggedIn(true))
            dispatch(setUserProfile(response))
            dispatch(setIsLoading(false))
        }
        
    } else {
        dispatch(setIsLoggedIn(false))
        dispatch(setIsLoading(false))

    }
}

export const handleClickResetPassword = ({ navigation }) => {
    navigation.navigate(RESET_PASSWORD_PAGE)
}