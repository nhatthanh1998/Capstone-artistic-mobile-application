import { registerAccount } from '../../apis/users'
import { LOGIN_PAGE } from '../../enums/page-name'


export const handleSignUp = async ({email, password, rePassword, setEmailError, setPasswordError, setRePasswordError, setSuccess}) => {
    let isValidated = true
    
    if(email.length == 0) {
        setEmailError("Email is required!")
        isValidated = false
    } else {
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


    if(isValidated == true) {
        const response = await registerAccount({email, password})
        const {status, message} = response
        if(status && message) {
            setEmailError(message)
        } else {
            setSuccess(true)
        }
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