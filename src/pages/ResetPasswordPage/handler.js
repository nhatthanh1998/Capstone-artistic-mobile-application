import { resetPassword } from '../../apis/users'
import { setIsLoading } from '../../redux/slicers/is-loading.slicer'
import {validateEmail} from '../../utils'

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