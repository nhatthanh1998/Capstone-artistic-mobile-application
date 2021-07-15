import { registerAccount } from '../../apis/users'
import { LOGIN_PAGE } from '../../enums/page-name'
import { setIsLoading } from '../../redux/slicers/is-loading.slicer'
import { validateEmail } from '../../utils'
import Toast from 'react-native-toast-message';


export const handleSignUp = async ({email, password, rePassword, setEmailError, setPasswordError, setRePasswordError, setSuccess, dispatch}) => {
    
    let isValidated = true
    if(email.length == 0) {
        setEmailError("Email is required!")
        isValidated = false
    }
    else if (validateEmail(email) == false) {
        setEmailError("Email is invalid format!")
        isValidated = false
    }
    else {
        setEmailError("")
    }

    if(password.length == 0) {
        setPasswordError("Password is required!")
        isValidated = false
    } else {
        setPasswordError("")
    }

    if(rePassword.length == 0) {
        setRePasswordError("RePassword is required!")
        isValidated = false
    } else {
        setRePasswordError("")
    }

    if(rePassword.length == 0) {
        setRePasswordError("RePassword is required!")
        isValidated = false
    }
    else if(password !== rePassword ) {
        setRePasswordError("RePassword must be same as Password!")
        isValidated = false
    } else {
        setRePasswordError("")
    }

    if(isValidated) {
        dispatch(setIsLoading(true))
        const {data, statusCode, message} = await registerAccount({email, password})
        if(statusCode && message) {
            if(statusCode == 666) {
                Toast.show({
                    text1: "Error",
                    text2: message,
                    type: 'error',
                    position: 'top'
                })
            } else {
                setEmailError(message)
            }
        } else {
            setSuccess(true)
        }
        dispatch(setIsLoading(false))
    } 
}

export const handleChangeRePassword = ({text, password, setRePassword, setRePasswordError}) =>  {
    setRePassword(text)
    if(text !== password) {
        setRePasswordError("RePassword must be same as Password!")
    } else {
        setRePasswordError("")
    }
}

export const handleChangeText = ({text, setState}) => {
    setState(text)
}

export const handlePressLoginPage = ({navigation}) => {
    navigation.navigate(LOGIN_PAGE)
}
