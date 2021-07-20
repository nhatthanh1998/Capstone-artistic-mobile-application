import { resetPassword } from '../../apis/users'
import { setIsLoading } from '../../redux/slicers/is-loading.slicer'


export const validateEmail = (emailAdress) => {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regexEmail)) {
    return true; 
  } else {
    return false; 
  }
}

export const handleResetPassword = async ({email, setEmailError, setShowResetPasswordSuccessModal, dispatch}) => {
    let isValid = true
    if(email.length === 0) {
        isValid = false
        setEmailError("Email cannot be blank!")
    }
    if(email.length > 0) {
        if(validateEmail(email) === false) {
            isValid = false
            setEmailError("Email must be valid email format!")
        }
    }

    if(isValid === true) {
        dispatch(setIsLoading(true))
        setEmailError("")
        const {data, statusCode, message} = await resetPassword({email})
        if(statusCode && message) {
            dispatch(setIsLoading(false))
            setEmailError(message)
        } else {
            dispatch(setIsLoading(false))
            setShowResetPasswordSuccessModal(true)
        }
    }
}