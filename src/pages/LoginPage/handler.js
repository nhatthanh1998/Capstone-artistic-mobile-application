import { login } from '../../apis/auth'
import { REGISTER_PAGE, RESET_PASSWORD_PAGE } from '../../enums/page-name'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {getUserProfile} from '../../apis/users'
import {setIsLoggedIn, setUserProfile} from '../../redux/slicers/user.slicer'
import {setIsLoading} from '../../redux/slicers/is-loading.slicer'
import Toast from 'react-native-toast-message';
import { validateEmail } from '../../utils'

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

export const handleClickRegister = ({ navigation }) => {
    navigation.navigate(REGISTER_PAGE)
}

export const checkIsLoggedIn = async ({ dispatch }) => {
    dispatch(setIsLoading(true))
    const token = await AsyncStorage.getItem('token')
    if (token !== null) {
        const {data, message, statusCode} = await getUserProfile()

        if (message && statusCode) {
            await AsyncStorage.removeItem("token")
            dispatch(setIsLoggedIn(false))
            dispatch(setIsLoading(false))
        }
        else {
            dispatch(setIsLoggedIn(true))
            dispatch(setUserProfile(data))
            dispatch(setIsLoading(false))
        }
    }
}

export const handleClickResetPassword = ({ navigation }) => {
    navigation.navigate(RESET_PASSWORD_PAGE)
}

export const handleLogin = async ({ email, password, setEmailError, setPasswordError, dispatch, setError }) => {
    let isValidated = true
    if (email.length === 0) {
        setEmailError("Email is required!")
        isValidated = false
    }

    if(email.length > 0) {
        if(validateEmail(email) == false) {
            isValidated = false
            setEmailError("Email is invalid format!")
        }
    }



    if (password.length === 0) {
        setPasswordError("Password is required!")
        isValidated = false
    }
    
    if (isValidated === true) {
        dispatch(setIsLoading(true))
        const {token, statusCode, message} = await login({ email, password })

        if(statusCode && message) {
            if(statusCode == 666) {
                Toast.show({
                    text1: "Error",
                    text2: message,
                    type: 'error',
                    position: 'top'
                })
            } else {
                setError(true)
            }
            dispatch(setIsLoading(false))
        } else {
            setError(false)
            AsyncStorage.setItem('token', token)
            checkIsLoggedIn({dispatch})
            dispatch(setIsLoading(false))
        }
    }
}
