import { MAIN_PAGE } from '../../enums/page-name'
import { changePassword } from '../../apis/users'
import { setIsLoading } from '../../redux/slicers/is-loading.slicer'

export const handleInputEmail = (text, setEmail, setEmailError) => {

}

export const handleRequestResetPassword = ({email, setResponseError, setEmailError, dispatch }) => {
    let isValidated = true
    if (email.length == 0) {
        isValidated = false
        setEmailError("Email is required!")
    }
    else if (validateEmail(email) == false ) {
        isValidated = false
        setEmailError("Email must be valid!")
    }

    if(isValidated == true) {
        
    }
}

export const validateEmail = (emailAdress) => {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regexEmail)) {
    return true; 
  } else {
    return false; 
  }
}



export const handleChangePassword = async ({
    oldPassword,
    newPassword,
    rePassword,
    setOldPasswordError,
    setNewPasswordError,
    setRePasswordError,
    dispatch,
    setShowChangePasswordSuccessModal
}) => {

    let isValidated = true

    if (oldPassword.length == 0) {
        isValidated = false
        setOldPasswordError("Old Password is required!")
    }

    if (newPassword.length == 0) {
        isValidated = false
        setNewPasswordError("New Password is required!")
    }

    if (rePassword.length == 0) {
        isValidated = false
        setRePasswordError("Old Password is required!")
    }

    if (rePassword !== newPassword) {
        isValidated = false
        setRePasswordError("Verify Password must same with New Password.")
    }

    if (isValidated == true) {
        dispatch(setIsLoading(true))
        response = await changePassword({ oldPassword, newPassword })
        dispatch(setIsLoading(false))
        if (response.statusCode == 400 && response.message) {
            setOldPasswordError("Old password not correct")
        } else {
            setShowChangePasswordSuccessModal(true)
        }
    }

}

export const handleChangeOldPassword = ({ text, setOldPassword, setOldPasswordError }) => {
    setOldPassword(text)
    if (text.length == 0) {
        setOldPasswordError("Old Password is required!")
    } else {
        setOldPasswordError("")
    }
}

export const handleChangeNewPassword = ({ text, setNewPassword, setNewPasswordError }) => {
    setNewPassword(text)
    if (text.length == 0) {
        setNewPasswordError("New Password is required!")
    } else {
        setNewPasswordError("")
    }
}

export const handleChangeRePassword = ({ text, newPassword, setRePassword, setRePasswordError }) => {
    setRePassword(text)
    if (text !== newPassword) {
        setRePasswordError("Verify Password must same with New Password.")
    } else {
        setRePasswordError("")
    }
}

export const handleCloseChangePasswordModal = ({ navigation }) => {
    navigation.navigate(MAIN_PAGE)
}
