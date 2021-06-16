import { uploadProfile } from '../../apis/users'
import { MAIN_PAGE } from '../../enums/page-name'
import { setUserProfile } from '../../redux/slicers/user.slicer'
import moment from 'moment'


export const handleUploadProfile = async ({firstName, lastName, dateOfBirth, dispatch, setShowEditProfileSuccessModal, setFirstNameError, setLastNameError}) => {
    let isValidated = true
    if(firstName.length == 0) {
        setFirstNameError("firstName is required!")
        isValidated = false
    } else {
      setFirstNameError("")
    }
    if(lastName.length == 0) {
        setLastNameError("lastName is required!")
        isValidated = false
    } else {
      setFirstNameError("")    
    }

    if(isValidated == true) {
        const response = await uploadProfile({firstName, lastName, dateOfBirth})
        dispatch(setUserProfile(response))
        setShowEditProfileSuccessModal(true)
    }
}

export const showDatePicker = ({setDatePickerShow}) => {
    setDatePickerShow(true);
  };

export const handleChangeFirstName = ({text, setFirstName, setFirstNameError}) =>{
    setFirstName(text)
    if(text.length == 0) {
      setFirstNameError("firstName is required!")
    } else {
      setFirstNameError("")    
    }
}


export const handleChangeLastName = ({text, setLastName, setLastNameError}) => {
  setLastName(text)
  if(text.length == 0) {
    setLastNameError("lastName is required!")
  } else {
    setLastNameError("")    
  }
}


export const hideDatePicker = ({setDatePickerShow}) => {
    setDatePickerShow(false);
  };


export const handleSelectDate = ({date, setDatePickerShow, setUpdatedDateOfBirth, setUpdatedDateOfBirthText}) => {
    setUpdatedDateOfBirth(date)
    const dateText = moment(date).format('Do MMMM YYYY')
    setUpdatedDateOfBirthText(dateText)
    setDatePickerShow(false)
};


export const handleCloseProfilePage = ({navigation}) => {
  navigation.navigate(MAIN_PAGE)
}
