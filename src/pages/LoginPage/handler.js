import { login } from '../../apis/auth'
import { REGISTER_PAGE, RESET_PASSWORD_PAGE } from '../../enums/page-name'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {getUserProfile} from '../../apis/users'
import {setIsLoggedIn, setUserProfile} from '../../redux/slicers/user.slicer'
import {setIsLoading} from '../../redux/slicers/is-loading.slicer'
export const handleChangeEmail = ({text, setEmail, setEmailError}) => {
    setEmail(text)
    if(text.length > 0) {
        setEmailError('')
    }
}

export const handleChangePassword = ({text, setPassword, setPasswordError}) => {
    setPassword(text)
    if(text.length > 0) {
        setPasswordError('')
    }
}

export const handleLogin = async ({ email, password, setEmailError, setPasswordError, dispatch, setError }) => {
    let isValidated = true
    if (email.length === 0) {
        setEmailError("Email is required!")
        isValidated = false
    }
    if (password.length === 0) {
        setPasswordError("Password is required!")
        isValidated = false
    }

    if (isValidated === true) {
        try {
            const response = await login({ email, password })
            const { token } = response
            console.log(token)
            setError(false)
            AsyncStorage.setItem('token', token)
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
    const token = await AsyncStorage.getItem('token')
    if (token !== null) {
        const {data, message, statusCode} = await getUserProfile()
        if (message && statusCode === UNAUTHORIZED) {
            await AsyncStorage.removeItem("token")
            dispatch(setIsLoggedIn(false))
        }
        else {
            dispatch(setIsLoggedIn(true))
            dispatch(setUserProfile(data))
        }
        
    } else {
        dispatch(setIsLoggedIn(false))
    }
}

export const handleClickResetPassword = ({ navigation }) => {
    navigation.navigate(RESET_PASSWORD_PAGE)
}