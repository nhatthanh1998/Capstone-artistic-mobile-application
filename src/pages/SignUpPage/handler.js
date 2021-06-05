import { registerAccount } from '../../apis/users'


export const handleSignUp = async ({username, password, rePassword, setUsernameError, setPasswordError, setRePasswordError, setRegisterError, setSuccess}) => {
    let isValidated = true
    
    if(username.length == 0) {
        setUsernameError("Username is required!")
        isValidated = false
    } else {
        setUsernameError("")
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

    if(password !== rePassword ) {
        setRePasswordError("RePassword must be same as Password!")
        isValidated = false
    } else {
        setRePasswordError("")
    }


    if(isValidated == true) {
        const response = await registerAccount({username, password})
        const {status, message} = response
        if(status && message) {
            setRegisterError(message)
        } else {
            setSuccess(true)
        }
    } 


    
}

export const handleChangeRePassword = ({text, password, setRePassword, setRePasswordError}) =>  {
    setRePassword(text)
    if(text !== password) {
        setRePasswordError("RePassword must be same as Password!")
    }
}

export const handleChangeText = ({text, setState}) => {
    setState(text)
}